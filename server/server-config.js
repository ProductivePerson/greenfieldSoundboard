var express = require('express');
var fs = require('fs');
/*
  Partial adds partial rendering support to Express so that you can
  render multiple templates in a single render call.
  Each template is provided its own template data object on render and the method,
  by default, will respond to the request with a json object containing the partial name
  and associated rendered html. Useful for when your frontend wants to request
  multiple templates in parallel, e.g. updating sections of a page using Ajax.
*/
// var partials = require('express-partials');
// var bodyParser = require('body-parser');
var util = require('./lib/utility.js');
var handler = require('./lib/request-handler.js');
var path = require('path');
// var session = require('express-session');
// var User = require('./model/usermodel.js');

var app = express();

var rootPath = path.normalize(__dirname + '/../public');

// app.use(partials());
// app.use(express.bodyParser());
app.use('/dist', express.static(__dirname + '/../dist/'));
app.use('/soundfiles', express.static(__dirname + '/../foley/'));
app.use('/node_modules', express.static(__dirname + '/../node_modules/'));
app.use('/compiled', express.static(__dirname + '/../compiled/'));
app.use('/styles', express.static(__dirname + '/../public/components/styles/'));

// app.use(express.cookieParser('secret'));
// app.use(session({
//   secret: 'secretCode',
//   resave: false,
//   saveUninitialized: true
// }));

// If at root with token/auth, redirect to /user. res.sendStatus.
// add util.checkUser
// else at root without token/auth, redirect to login page. Send status.
// res.end();

app.get('/', function(req, res) {
  res.sendFile(path.join(rootPath + '/index.html'));
});
// serve index.
// callback, redirects to /login.

app.get('/sounds', function (req, res) {//returns an array of all the sounds in foley folder
  fs.readdir(path.join(__dirname + '/../foley/'), function(err, files) {
    if (err) console.error(err);

    res.send(files);
  });
});

// we may have to create many of the below routers, because each keyboard key
// add util.checkUser
// must be given ability to make a request to server.
app.post('/soundboard', function(req, res) {
  // for() {

  // }
  // return all files from DB as object (keycode as key: string representing path for value);
  // add util.checkUser
  // fetch from DB the requested file.

});

app.post('/soundboard/:user', function(req, res) {
  // user another helper function that will determine if this user exists in the DB.
  // if so,
  // and what must happen next.
  // fetch from DB the requested file.
});

/** AUTHENTICATION ROUTES **/

// if login success, render /user template. res.sendStatus.
// Else, send error message. Send status.
// res.end();
app.get('/login', handler.loginUserForm);

app.post('/login', handler.loginUser);
// Instantiate a new user with input username and password.
  // If user exists in DB, then compare input password to stored password.
  // If user exists && user is auth, then create session and redirect to soundboard.
  // If user, but user is not auth, then redirect to login page.
  // else if user is not auth || !user, then redirect to /login.

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
    // handler.logoutUser;
  });
});

app.get('/signup', handler.signupUserForm);

app.post('/signup', handler.signupUser);
// if signup successful, redirect to /login. res.sendStatus();
// Else, send error msg. Send status.
// app.post('/signup', function(req, res) {
//   var username = req.body.username;
//   var password = req.body.password;

  // instantiate a new user with a username and password.
  // check if user exists. If exists, throw message to go to login.
  // If new user, save the new user and password in DB.
  // create a session via utility function.
  // else if the account exists, then redirect to /signup.
// });

module.exports = app;

/*
  32 different ajax calls that will be routed to paths.

*/
