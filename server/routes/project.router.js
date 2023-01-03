const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

// routes

// GET - get all projects associated with the user.

// we need to know project name, ensemble name, description, owner name, and other users on the project

router.get('/', (req, res) => {
  // console.log('getting projects for user no.', req.user.id)
  const query = `SELECT project.*, "user".first_name AS owner_first, "user".last_name AS owner_last FROM project
                JOIN user_project ON user_project.project_id = project.id
                JOIN "user" ON "user".id=project.owner_id
                WHERE user_id = $1`
  pool.query(query, [req.user.id])
    .then(result => {
      // console.log('got projects', result.rows)
      res.send(result.rows)
    })
    .catch(err => console.log('could not get projects!', err))
})

// GET - get all info for a specific project

router.get('/:id', (req, res) => {
  // console.log('getting info for project no. ', req.params.id);
  res.sendStatus(200)
})

// POST - create new project
// any user can do this; the project will be stored with their user id

// req.body looks like {
//   name: 'asdfasdf',
//   ensemble_name: '',
//   description: '',
//   repertoire: [ { title: 'adsf', composer: 'asdf' } ],
//   dates: [
//     {
//       title: 'asdfadsf',
//       date: '',
//       start: '',
//       end: '',
//       location: '',
//       type: '',
//       notes: ''
//     }
//   ],
//   collaborators: [userId, userId, userId, etc.]
// }
router.post('/', async (req, res) => {
  console.log('req.body: ', req.body)
  const client = await pool.connect();

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
      const insertDateValues = [date.name, date.date, date.start, date.end, date.location,date.type, date.notes, projectId];
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

router.put('/:id', (req, res) => {
  console.log('editing project no.', req.params.id);
  res.sendStatus(200)
})

// DELETE - delete existing project
// only allowed by the project owner

router.delete('/:id', (req, res) => {
  console.log('deleting project no. ', req.params.id);
  res.sendStatus(200)
}
)











module.exports = router;