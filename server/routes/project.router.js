const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
const prepareDates = require('../modules/prepareDates')

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
  console.log('in test GET space')
  const client = await pool.connect();
  console.log('req.user: ', req.user);

  try {
    await client.query('BEGIN');

    let allProjects = []

    // 1. general info
    const generalInfoResults = await client.query(`
      SELECT project.id, project.name, project.ensemble_name, project.owner_id, project.description, project.backgroundcolor AS "backgroundColor", project.color FROM project
      JOIN user_project ON user_project.project_id = project.id
      WHERE user_project.user_id = $1
    `, [req.user.id]);

    allProjects = [...generalInfoResults.rows];

    // 2. collaborators
    const collaboratorResults = await client.query(`
      SELECT project.id, json_agg(collaborator) AS collaborators FROM project
      JOIN user_project ON user_project.project_id=project.id
      JOIN "user" "collaborator" ON "collaborator".id = user_project.user_id
      GROUP BY project.id; 
    `)

    console.log('projects', allProjects)
    console.log('collaborator results: ', collaboratorResults.rows)

    // attach collaborator arrays to corresponding project object by matching project id
    for (let project of allProjects) {
      console.log('matching collaborators for project id:', project.id)
      for (let result of collaboratorResults.rows) {
        console.log('collaborators for project: ', result.id)
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
      SELECT project.id, json_agg("date".*) AS dates FROM project
      JOIN user_project ON user_project.project_id = project.id
      JOIN "date" ON "date".project_id = project.id
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
    for (let project of allProjects) {
      for (let date of project.dates) {
        date.title = date.name || 'unnamed date'
      }
    }
    // console.log('projects parsed:', prepareDates.parseDatesFromDB(allProjects))

    // console.log('project dates', (prepareDates.parseDatesFromDB(allProjects))[0]?.dates)

    // console.log('test type of a date: ', typeof prepareDates.parseDatesFromDB(allProjects)[0].dates[0].date)

    // res.send(prepareDates.parseDatesFromDB(allProjects)||[])
    console.log(allProjects)
    res.send(allProjects)
  }
  catch (error) {
    await client.query('ROLLBACK')
    console.log('Error GET /api/project/test', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
})





// GET - get all info for a specific project

// router.get('/:id', (req, res) => {
//   // console.log('getting info for project no. ', req.params.id);
//   res.sendStatus(200)
// })

router.post('/', async (req, res) => {
  console.log('req.body: ', req.body)
  const client = await pool.connect();
  // const bodyDatesPrepped = prepareDates.prepareDatesForDB(req.body)

  console.log('req.body: ', req.body)
  // console.log('bodyDatesPrepped: ', bodyDatesPrepped)

  try {
    const {
      name,
      ensemble_name,
      description,
      repertoire,
      dates,
      collaborators,
    } = req.body;

    await client.query('BEGIN')

    // create project in project table
    const projectInsertResults = await client.query(`INSERT INTO "project" ("name", "ensemble_name", "owner_id", "description")
      VALUES ($1, $2, $3, $4)
      RETURNING id;`, [name, ensemble_name, req.user.id, description]);
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
      SET "name" = $1, ensemble_name = $2, description = $3
      WHERE id = $4
    `, [name, ensemble_name, description, req.params.id])

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