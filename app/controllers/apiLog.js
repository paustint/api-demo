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
  getApiLogs(null, req.params.user, req.query.limit, req.query.page)
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
}

function getApiLogs(query, user, limit, page) {
  page = page || 0;
  page = parseInt(page);
  limit = limit || 100;
  limit = parseInt(limit);
  query = query || {};
  if (user) query.user = user;
  return new Promise((resolve, reject) => {
    ApiLog.find(query)
    .limit(limit)
    .skip(limit * page)
    .sort({createdAt: 'asc'})
    .exec((err, results) => {
      if (err) return reject({error: err.message});
      ApiLog.count(query).exec((err, count) => {
        var pagination;
        if (err) {
          pagination = {error: 'Could not calculate pagination', err: err};
        } else {
          pagination = {page: page, limit: limit, pageCount: Math.ceil(count / limit), total: count};
        }
        resolve({results: results, pagination: pagination});
      });
    });
  })
}


