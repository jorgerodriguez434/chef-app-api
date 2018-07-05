const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
//const expressJWT = require("express-jwt");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const dishRouter = require("./router");
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const passport = require('passport');
const { CLIENT_ORIGIN, DATABASE_URL, PORT } = require("./config");
//const config = require("./config");


app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.use('/api/dishes', dishRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use(morgan("common"));

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });
// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'This is a protected endpoint',
    code: 200,
    message: "You have access! Great job!"
  });
}); 

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'try again' });
});  

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port} --July 2018`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer };