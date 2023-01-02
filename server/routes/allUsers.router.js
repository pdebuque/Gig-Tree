const express = require('express');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

// routes

// GET - all users

router.get('/', (req,res)=>{
  const query = `SELECT * FROM "user"
    `
  pool.query(query)
    .then(result=>{
      console.log('got users', result.rows)
      res.send(result.rows)
    })
    .catch(err=>console.log('could not get users!', err))
})












module.exports = router;