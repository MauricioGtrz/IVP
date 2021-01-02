var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const log = console.log;

/* Create Routers as path to files */
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var teamRouter = require('./routes/team');
var eventsRouter = require('./routes/events');


var app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* Pages here */
app.use('/', indexRouter);
app.use('/About/', aboutRouter);
app.use('/Contact/', contactRouter.router);
app.use('/Team/', teamRouter);
app.use('/Events/', eventsRouter);



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

module.exports = app;
