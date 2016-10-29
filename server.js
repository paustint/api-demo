var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var moment = require('moment');
var http = require('http');
var expressValidator = require('express-validator');

// Load environment variables from .env file
dotenv.load();

// Routes
var routes = require('./app/routes');

var app = express();

mongoose.connect(process.env.MONGODB);

mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

mongoose.Promise = global.Promise;

app.set('port', process.env.PORT || 3000);
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

app.use('/api', routes);

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

app.use(function(req, res, next) {
  res.status(404);
  res.send({error: `Path '${req.url}' is not found` })
});

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
