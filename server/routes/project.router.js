const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

// routes
router.get('/', (req,res)=>{
  const query=`SELECT project.* FROM project
                JOIN user_project ON user_project.project_id = project.id
                WHERE user_id = $1`
  pool.query(query,[req.user.id])
    .then(result=>res.send(result.rows))
    .catch(err=>console.log('could not get projects!', err))
})











module.exports = router;