const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

//routes
const projectRouter = require('./routes/project.router.js');
const userRouter = require('./routes/user.router.js')


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/project', projectRouter);
app.use('/api/user', userRouter)

// static files
app.use(express.static('build'));
/** ---------- START SERVER ---------- **/
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});