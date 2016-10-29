var moment = require('moment');
var expressValidator = require('express-validator');

var ApiLog = require('../models/ApiLog');
var responseHelper = require('../services/responseHelper');
/**
 * 200 - OK success GET
 * 201 - created success POST
 * 203 - created success PUT
 * 204 - no content success DELETE
 * 400 bad request
 * 401 unathorized
 * 403 forbidden
 * 404 not found
 * 405 method not allowed
 */

var sendJson = function(res, status, content) {
      content = content || {};
      res.status(status);
      return res.json(content);
};

exports.getApiLogs = function(req, res) {
  getApiLogs(null, req.params.user)
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, results);
  });
}

function getApiLogs(query, user) {
  query = query || {};
  if (user) query.user = user;
  return new Promise((resolve, reject) => {
    ApiLog.find(query, (err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  })
}


