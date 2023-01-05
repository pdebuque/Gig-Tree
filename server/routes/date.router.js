const express = require('express');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

// routes

// GET - all events associated with the user

router.get('/', (req,res)=>{
  console.log('getting events for user no.', req.user.id)
  const query = `
    SELECT "date".* FROM "date"
    JOIN project ON project.id = "date".project_id
    JOIN user_project ON project.id=user_project.project_id
    WHERE user_project.user_id=$1
    `
  pool.query(query,[req.user.id])
    .then(result=>{
      console.log('got projects', result.rows)
      res.send(result.rows)
    })
    .catch(err=>console.log('could not get projects!', err))
})












module.exports = router;