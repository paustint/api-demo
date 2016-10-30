var moment = require('moment');
var expressValidator = require('express-validator');

var Customer = require('../models/customer');
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

// var sendJ1son = function(res, status, content) {
//       content = content || {};
//       res.status(status);
//       return res.json(content);
// };

exports.getCustomers = function(req, res) {
  getCustomers(null, req.params.user, req.query.limit, req.query.page)
  .then(results => {
    responseHelper.sendJson(req, res, 200, results);
  })
  .catch(err => {
    responseHelper.sendJson(req, res, 400);
  });
}

exports.getCustomer = function(req, res) {
  var id = req.params.id;

  getCustomerById(id, req.params.user)
  .then(results => {
    responseHelper.sendJson(req, res, 200, results);
  })
  .catch(err => {
    responseHelper.sendJson(req, res, 400);
  });
}

exports.createCustomer = function(req, res) {
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email must be proper format').isEmail();
  
  var errors = req.validationErrors();
  if (errors) return responseHelper.sendJson(req, res, 400, {errors: errors});

  var obj = new Customer(req.body);
  if (req.params.user) obj.user = req.params.user;
  obj.save(err => {
    if (err) return responseHelper.sendJson(req, res, 400, err.message);
    responseHelper.sendJson(req, res, 201, obj);
  })
}

exports.updateCustomer = function(req, res) {
  req.checkBody('email', 'Email must be proper format').optional().isEmail();
  
  var errors = req.validationErrors();
  if (errors) return responseHelper.sendJson(req, res, 400, {errors: errors});  

  var validParams = ["firstName","lastName","email","phone"];

  var id = req.params.id;
  var updatedParams = {};
  validParams.forEach(param => {
    if (req.body[param]) updatedParams[param] = req.body[param];
  });

  // Make sure at least one valid parameter is included
  if (Object.keys(updatedParams).length === 0) {
    return responseHelper.sendJson(req, res, 400, {errors: `No valid parameters were provided to update.  Valid parameters are: ${validParams.join(', ')}`});
  }

  updateCustomer(id, updatedParams)
  .then(results => {
    responseHelper.sendJson(req, res, 203, results);
  })
  .catch(err => {
    if (!results) return responseHelper.sendJson(req, res, 400, {errors: 'Record could not be found with provided id'});
    responseHelper.sendJson(req, res, 400, err);
  });
}

exports.deleteCustomer = function(req, res) {
  var id = req.params.id;
  // todo implement validator
  getCustomerById(id, req.params.user)
  .then(results => {
    if (!results) return responseHelper.sendJson(req, res, 400, {errors: 'Record could not be found with provided id'});
    results.remove(err => {
      if (err) return responseHelper.sendJson(req, res, 400, results);
      responseHelper.sendJson(req, res, 204, {message: "Deleted sucessfully"});
    });
  })
  .catch(err => {
    responseHelper.sendJson(req, res, 400, err);
  });
}

function getCustomerById(id, user) {
  return new Promise((resolve, reject) => {
    var query = {_id: id};
    if (user) query.user = user;
    Customer.find(query, (err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  })
}

function getCustomers(query, user, limit, page) {
  page = page || 0;
  page = parseInt(page);
  limit = limit || 100;
  limit = parseInt(limit);
  query = query || {};
  if (user) query.user = user;
  return new Promise((resolve, reject) => {
    Customer.find(query)
    .limit(limit)
    .skip(limit * page)
    .sort({createdAt: 'asc'})
    .exec((err, results) => {
      if (err) return reject({error: err.message});
      Customer.count(query).exec((err, count) => {
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

function updateCustomer(id, updateParams) {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(id, updateParams, (err) => {
      if (err) return reject({error: err.message});
      getCustomerById(id)
      .then(results => { resolve(results) })
      .catch(err => { reject(err) });
    });
  })
}

