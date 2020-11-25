var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const log = console.log;

/* MongoDB Database */
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var cors = require("cors");

/* Create Routers as path to files */
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var teamRouter = require('./routes/team');
var eventsRouter = require('./routes/events');
var newsRouter = require('./routes/news');
var loginRouter = require('./routes/login');

var app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
/* Pages here */
app.use('/', indexRouter);
app.use('/About/', aboutRouter);
app.use('/Contact/', contactRouter.router);
app.use('/Team/', teamRouter.router);
app.use('/Events/', eventsRouter);
app.use('/News/', newsRouter.router);
app.use('/Login/', loginRouter.router);


/* Email: Post set up */
app.post('/email', (req, res) => {
  // res.sendFile(path.join(__dirname + '/contact-us.html'));
  //TODO
  //send email here
  const { name, subject, email, text } = req.body;
  console.log('Data: ', req.body);

  contactRouter.sendMail(name, email, subject, text, function(err, data) {
    if (err) {
      res.status(500).json({ message: 'Internal Error' });
    } else {
      res.status({ message: 'Email sent!!!' });
      console.log('Sent');
    }
  });
});



/* Database set up */
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/* News: POST request to insert data (News) */
app.post('/NewsAdd', (req, res) => {
  //const { name, subject, email, text } = req.body;
  const newsModel = newsRouter.model;
  const data = {committee: "C-1", title: "title-1", description: "desc-1", date: 'Today'};
  newsRouter.add_news(newsModel, data);
});


/* News: POST request to insert data (Team) */
app.post('/TeamAdd', (req, res) => {
  //const { name, subject, email, text } = req.body;
  const MemberModel = teamRouter.model;
  const data = {
    image: "myimage",
    name: "Joe",
    major: "Bruin",
    pronouns: "They/Them/Theirs",
    committee: "Bruin Committee",
    title: "Mascott",
    description: "I am lovely!"
  };
  teamRouter.add_news(MemberModel, data);
});


/* Login: authentication */
app.post('/auth', (req, res) => {
  //const { name, subject, email, text } = req.body;
  var User = loginRouter.model;
  const {user, pwd} = req.body;
  loginRouter.findUser(user, pwd);
});





/* By Default */
/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app, mongoose: mongoose};
