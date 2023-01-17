// Node Module that will connect to postgesql
const pg = require('pg');
// Setup PG to connect to the database
const Pool = pg.Pool;

let pool;

if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
          rejectUnauthorized: false
      }
  });
}
else {
  pool = new pg.Pool({
      host: 'localhost',
      port: 5432,
      database: 'gig-tree', 
  });
}



// Listener setup on the pool isn't required, 
// but can be super handy for troubleshooting.
pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (error) => {
    console.log('Error with database pool', error);
});

module.exports = pool;