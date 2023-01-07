const express = require('express');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

// routes

// GET - all dates associated with the user

router.get('/', (req,res)=>{
  console.log('getting dates for user no.', req.user.id)
  const query = `
    SELECT "date".*, "date"."name" AS title FROM "date"
    JOIN project ON project.id = "date".project_id
    JOIN user_project ON project.id=user_project.project_id
    WHERE user_project.user_id=$1
    `
  pool.query(query,[req.user.id])
    .then(result=>{
      console.log('got dates', result.rows)
      res.send(result.rows)
    })
    .catch(err=>console.log('could not get dates!', err))
})












module.exports = router;