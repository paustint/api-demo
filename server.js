var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var moment = require('moment');
var http = require('http');
var expressValidator = require('express-validator');
var hbs = require('hbs');

// Load environment variables from .env file
dotenv.load();

// Routes
var index = require('./app/routes/index');
var api = require('./app/routes/api');

var app = express();

mongoose.connect(process.env.MONGODB);

mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app', 'views', 'partials'), function() {
  console.log('loaded partials');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator({
  customValidators: {
    isPositive: function(val) {
      return val >= 0;
    }
  }
}));
app.use(function (req, res, next) {
  console.log('route called: ' + req.originalUrl);
  next();
});

// Routes
app.use('/', index);
app.use('/api', api);

app.use(function(req, res, next) {
  res.status(404);
  if(req.baseUrl === '/api') {
    res.json({error: `Path '${req.url}' is not found` });
  } else {
    res.render('404', {
      path: req.url
    });
  }
  
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if(req.baseUrl === '/api') {
    res.json({
      error: 'There was a server error processing your request',
      systemErr: err
    });
  } else {
    res.render('error', {
      message: err.message,
      error: err
    });
  }

});

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
