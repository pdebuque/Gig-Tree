const express = require('express');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

// routes

// GET - get all projects associated with the user

router.get('/', (req,res)=>{
  const query=`SELECT project.* FROM project
                JOIN user_project ON user_project.project_id = project.id
                WHERE user_id = $1`
  pool.query(query,[req.user.id])
    .then(result=>res.send(result.rows))
    .catch(err=>console.log('could not get projects!', err))
})

// GET - get all info for a specific project

router.get('/:id', (req,res)=>{
  console.log('getting info for project no. ', req.params.id);
  res.sendStatus(200)
})

// POST - create new project
// any user can do this; the project will be stored with their user id

router.post('/',(req,res)=>{
  console.log('storing new project');
  res.sendStatus(200)
})

// PUT - edit existing project
// this will only be allowed by the project owner.

router.put('/:id', (req,res) =>{
  console.log('editing project no.', req.params.id);
  res.sendStatus(200)
})

// DELETE - delete existing project
// only allowed by the project owner

router.delete('/:id', (req,res) =>{
  console.log('deleting project no. ', req.params.id);
  res.sendStatus(200)
}
)











module.exports = router;