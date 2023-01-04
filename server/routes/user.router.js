const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('received new user', req.body)
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => {
      console.log('added user')
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// edit user information
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log('updating user info');
  const query = `UPDATE "user" 
                  SET first_name = $1, last_name = $2, bio = $3, location = $4, instrument_1 = $5, instrument_2 = $6, instrument_3 = $7, job_1 = $8, job_1_location = $9, job_2 = $10, job_2_location = $11
                  WHERE id = $12;`
  const values = [req.body.first_name, req.body.last_name, req.body.bio, req.body.location, req.body.instrument_1, req.body.instrument_2, req.body.instrument_3, req.body.job_1, req.body.job_1_location, req.body.job_2, req.body.job_2_location, req.user.id];

  pool.query(query, values)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log('could not edit', err)
      res.sendStatus(500)
    })
})


module.exports = router;
