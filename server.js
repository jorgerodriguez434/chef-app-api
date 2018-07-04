const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dishRouter = require("./router");
const userRouter = require("./users/router");
//const { router: userRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const passport = require('passport');
const { CLIENT_ORIGIN, DATABASE_URL, PORT } = require("./config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/dishes', dishRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use(morgan("common"));
 
/*

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
}); */

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port} --June 2018`);
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
