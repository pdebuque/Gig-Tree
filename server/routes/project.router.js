const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
const prepareDates = require('../modules/prepareDates')
const removeDupById = require('../modules/removeDup')

// routes

// GET - get all projects associated with the user.
/* 
objective: assemble array of objects:

projects = [
  {
    id: ,
    name: ,
    ensemble_name: ,
    description: ,
    repertoire: [{name, composer}, {}, etc.],
    dates: [{name, location, date, start, end, type, notes}, {}, etc.],
    collaborators: [{id, username, first_name, last_name, bio, etc.}, {}, etc.]
  },
]
*/


router.get('/', async (req, res) => {
  // console.log('in test GET space')
  const client = await pool.connect();
  // console.log('req.user: ', req.user);

  try {
    await client.query('BEGIN');

    let allProjects = []

    // 1. general info
    const generalInfoResults = await client.query(`
      SELECT user_project.project_accepted AS accepted, project.id, project.name, project.ensemble_name, project.owner_id, project.description, project.backgroundcolor AS "backgroundColor", project.color, user_project.starred FROM project
      JOIN user_project ON user_project.project_id = project.id
      WHERE user_project.user_id = $1
      ORDER BY project.id
    `, [req.user.id]);

    allProjects = [...generalInfoResults.rows];

    // 2. collaborators
    const collaboratorResults = await client.query(`
      SELECT project.id, json_agg(collaborator) AS collaborators FROM project
      JOIN user_project ON user_project.project_id=project.id
      JOIN "user" "collaborator" ON "collaborator".id = user_project.user_id
      GROUP BY project.id; 
    `)

    // console.log('projects', allProjects)
    // console.log('collaborator results: ', collaboratorResults.rows)

    // attach collaborator arrays to corresponding project object by matching project id
    for (let project of allProjects) {
      // console.log('matching collaborators for project id:', project.id)
      for (let result of collaboratorResults.rows) {
        // console.log('collaborators for project: ', result.id)
        if (project.id === result.id) {
          project.collaborators = result.collaborators
        }
      }
      if (!project.collaborators) project.collaborators = []
    }

    // 3. repertoire
    const repertoireResults = await client.query(`
      SELECT project.id, json_agg(piece.*) AS repertoire FROM project
      JOIN user_project ON user_project.project_id = project.id
      JOIN piece ON piece.project_id=project.id
      WHERE user_project.user_id = $1
      GROUP BY project.id;
    `, [req.user.id])

    // attach repertoire to corresponding projects by matching project id
    for (let project of allProjects) {
      for (let result of repertoireResults.rows) {
        if (project.id === result.id) {
          project.repertoire = [...result.repertoire];
        }
      }
      if (!project.repertoire) project.repertoire = []
    }

    // 4. dates
    const datesResults = await client.query(`
    WITH dates AS
    (SELECT "date".*, project."name" AS project_name, project.ensemble_name, project.backgroundcolor AS "backgroundColor", project.color AS color FROM project
        JOIN "date" ON "date".project_id = project.id)      	
        SELECT project.id, json_agg("dates".*) AS dates FROM dates
        JOIN project ON project.id=dates.project_id
        JOIN user_project ON user_project.project_id= project.id
        WHERE user_project.user_id = $1
        GROUP BY project.id;
    `, [req.user.id])

    // attach dates to corresponding projects by matching project id
    for (let project of allProjects) {
      for (let result of datesResults.rows) {
        if (project.id === result.id) {
          project.dates = [...result.dates];
        }
      }
      if (!project.dates) project.dates = []
    }
    await client.query('COMMIT')

    console.log('all projects before adding dates:', allProjects)
    console.log('sample date:', allProjects[0].dates)

    for (let project of allProjects) {
      if (project.dates) {
        for (let date of project.dates) {
          date.title = date.name || 'unnamed date'
        }
      }
    }
    res.send(allProjects)
  }
  catch (error) {
    await client.query('ROLLBACK')
    console.log('Error GET /api/project', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
})

// GET - get all info for a specific project

router.get('/:id', async (req, res) => {
  // console.log('getting info for project no. ', req.params.id);
  const queryText = `
  WITH collaborators AS (SELECT "user".*, user_project.project_accepted AS accepted FROM "user"
	INNER JOIN user_project ON user_project.user_id = "user".id)
	
    SELECT project.*, json_agg(piece.*) AS repertoire, json_agg(date.*) AS dates, json_agg(collaborators.*) AS collaborators, json_agg(user_project.project_accepted) AS accepted FROM collaborators
    JOIN user_project ON user_project.user_id = collaborators.id
    JOIN project ON project.id = user_project.project_id
    LEFT JOIN piece ON piece.project_id = project.id
    LEFT JOIN date ON date.project_id = project.id
    WHERE project.id=$1
    GROUP BY project.id;`
    
  pool.query(queryText, [req.params.id])
    .then(result => {
      // need to take out duplicates
      const project = result.rows[0];
      // console.log('project with duplicates:',project)
      const projectNoDup = { ...project, dates: removeDupById(project.dates), repertoire: removeDupById(project.repertoire), collaborators: removeDupById(project.collaborators) }
      // console.log('got current project', projectNoDup)
      res.send(projectNoDup)
    })
    .catch(err => console.log('could not get current project', err))

})

// POST a new project to the database

router.post('/', async (req, res) => {
  // console.log('req.body: ', req.body)
  const client = await pool.connect();
  // const bodyDatesPrepped = prepareDates.prepareDatesForDB(req.body)

  console.log('req.body: ', req.body)
  // console.log('bodyDatesPrepped: ', bodyDatesPrepped)

  try {
    const {
      name,
      ensemble_name,
      description,
      backgroundColor,
      color,
      repertoire,
      dates,
      collaborators,
    } = req.body;

    await client.query('BEGIN')

    // create project in project table
    const projectInsertResults = await client.query(`INSERT INTO "project" ("name", "ensemble_name", "owner_id", "description", "backgroundcolor", "color")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;`, [name, ensemble_name, req.user.id, description, backgroundColor, color]);
    console.log(projectInsertResults)
    const projectId = projectInsertResults.rows[0].id;

    // insert repertoire into the piece table
    await Promise.all(repertoire.map(piece => {
      const insertPieceText = `INSERT INTO "piece" ("name", "composer", "project_id") VALUES ($1, $2, $3)`;
      const insertPieceValues = [piece.name, piece.composer, projectId];
      return client.query(insertPieceText, insertPieceValues);
    }));

    // insert dates into date table
    await Promise.all(dates.map(date => {
      const insertDateText = `INSERT INTO "date" ("name", "date", "start", "end", "location", "type", "notes", "project_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
      const insertDateValues = [date.name, date.date, date.start, date.end, date.location, date.type, date.notes, projectId];
      return client.query(insertDateText, insertDateValues);
    }));

    // insert collaborators into user_project table. collaborator is an array of numbers, each representing the user's id
    await Promise.all(collaborators.map(collaborator => {
      const insertCollabText = `INSERT INTO "user_project" ("user_id", "project_id") VALUES ($1, $2)`;
      const insertCollabValues = [collaborator.id, projectId];
      return client.query(insertCollabText, insertCollabValues);
    }));

    // insert user into the user_project table if not already added; set project accepted true
    const userIds = collaborators.map(collaborator => collaborator.id);
    if (!(userIds.includes(req.user.id))) {
      await client.query(`INSERT INTO "user_project" ("user_id", "project_id", "project_accepted") VALUES ($1, $2, TRUE)`, [req.user.id, projectId]);
    }

    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error POST /api/project', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
});


// PUT - edit existing project
// this will only be allowed by the project owner.

router.put('/:id', async (req, res) => {
  console.log('editing project. req.body: ', req.body)
  const client = await pool.connect();

  // const bodyDatesPrepped = prepareDates.prepareDatesForDB(req.body)

  try {
    const {
      name,
      ensemble_name,
      description,
      backgroundColor,
      color,
      repertoire,
      dates,
      collaborators,
    } = req.body;

    await client.query('BEGIN')

    // 1. delete existing repertoire, dates, and collaborator data

    const deleteDateQuery = client.query(`
    DELETE FROM "date"
    WHERE "date".project_id = $1
  `, [req.params.id])

    const deletePieceQuery = client.query(`
    DELETE FROM piece
    WHERE piece.project_id=$1
  `, [req.params.id])

    const deleteUserProjectQuery = client.query(`
      DELETE FROM user_project
      WHERE user_project.project_id=$1
    `, [req.params.id])

    await Promise.all([deleteDateQuery, deletePieceQuery, deleteUserProjectQuery])

    // 2. update general info (name, ensemble_name, description)

    await client.query(`
      UPDATE project
      SET "name" = $1, ensemble_name = $2, description = $3, backgroundcolor = $5, color = $6
      WHERE id = $4
    `, [name, ensemble_name, description, req.params.id, backgroundColor, color])

    /* 
    const [[repertoire],[dates]]
    */

    // 3a. assemble promises for repertoire insertion
    const repPromises = repertoire.map(piece => {
      const insertPieceText = `INSERT INTO "piece" ("name", "composer", "project_id") VALUES ($1, $2, $3)`;
      const insertPieceValues = [piece.name, piece.composer, req.params.id];
      return client.query(insertPieceText, insertPieceValues)
    });

    // 3b. assemble promises for date insertion
    const datePromises = (dates.map(date => {
      const insertDateText = `INSERT INTO "date" ("name", "date", "start", "end", "location", "type", "notes", "project_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
      const insertDateValues = [date.name, date.date, date.start, date.end, date.location, date.type, date.notes, req.params.id];
      return client.query(insertDateText, insertDateValues);
    }))

    // 3c. assemble promises for collaboration insertion
    const collabPromises = (collaborators.map(collaborator => {
      const insertCollabText = `INSERT INTO "user_project" ("user_id", "project_id") VALUES ($1, $2)`;
      const insertCollabValues = [collaborator.id, req.params.id];
      return client.query(insertCollabText, insertCollabValues);
    }))

    // 4. execute promises
    await Promise.all([...repPromises, ...datePromises, ...collabPromises])


    /* 
        // 3. insert repertoire into the piece table
        await Promise.all(repertoire.map(piece => {
          const insertPieceText = `INSERT INTO "piece" ("name", "composer", "project_id") VALUES ($1, $2, $3)`;
          const insertPieceValues = [piece.name, piece.composer, req.params.id];
          return client.query(insertPieceText, insertPieceValues);
        }));
    
        // 4. insert dates into date table
        await Promise.all(dates.map(date => {
          const insertDateText = `INSERT INTO "date" ("name", "date", "start", "end", "location", "type", "notes", "project_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
          const insertDateValues = [date.name, date.date, date.start, date.end, date.location, date.type, date.notes, req.params.id];
          return client.query(insertDateText, insertDateValues);
        }));
    
        // 5. insert collaborators into user_project table.
        await Promise.all(collaborators.map(collaborator => {
          const insertCollabText = `INSERT INTO "user_project" ("user_id", "project_id") VALUES ($1, $2)`;
          const insertCollabValues = [collaborator.id, req.params.id];
          return client.query(insertCollabText, insertCollabValues);
        }));
     */
    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error POST /api/project', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
})

// PUT - star a project

router.put('/star/:id', (req, res) => {
  console.log('starring project number', req.params.id)
  const queryText = `
    UPDATE user_project
    SET starred = $1
    WHERE project_id = $2 AND user_id = $3
  `
  pool.query(queryText, [req.body.starred, req.params.id, req.user.id])
    .then(res.sendStatus(201))
    .catch(err => {
      console.log('could not update!', err);
      res.sendStatus(500)
    })
})

// PUT - accept a project
router.put('/accept/:id', (req,res)=>{
  const queryText = `
  UPDATE user_project
  SET project_accepted = NOT project_accepted
  WHERE user_id = $1 AND project_id = $2
  `
  pool.query(queryText, [req.user.id, req.params.id])
    .then(res.sendStatus(201))
    .catch(err=>{
      console.log('could not accept!', err)
      res.sendStatus(500)
    })
})

// DELETE - delete existing project
// only allowed by the project owner

router.delete('/:id', (req, res) => {
  console.log('deleting project no. ', req.params.id);

  const deleteQuery = `DELETE FROM project WHERE project.id = $1`
  pool.query(deleteQuery, [req.params.id])
    .then(() => {
      console.log('successfully deleted')
      res.sendStatus(200)
    })
    .catch(err => console.log('could not delete!', err))
}
)











module.exports = router;