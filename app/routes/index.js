(function(){
  'use strict';


var express = require('express');
var router = express.Router();
var endpoint = require('../views/models/endpoint');
var dataModel = require('../views/models/dataModel');
var otherInfo = require('../views/models/otherInfo');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'atg API Workshop',
    endpoints: endpoint.getEndpoints(),
    dataModels: dataModel.getDataModels(),
    otherInfo: otherInfo.getOtherInfo(),
  });
});

module.exports = router;

})();
