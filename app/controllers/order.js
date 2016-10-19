var util = require('util');
var moment = require('moment');
var expressValidator = require('express-validator');

var Order = require('../models/order');
var Product = require('../models/product');

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

exports.getOrders = function(req, res) {
  getOrders()
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, results);
  });
}

exports.getOrder = function(req, res) {
  var id = req.params.id;

  getOrderById(id)
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, results);
  });
}

exports.createOrder = function(req, res) {
  req.checkBody('customer', 'Customer is required').notEmpty();
  req.checkBody('products', 'Products are required').notEmpty();

  var errors = req.validationErrors();
  if (errors) return sendJson(res, 400, {errors: errors});

  // make sure products is an array
  if (!Array.isArray(req.body.products)) req.body.products = [req.body.products];

  var obj = new Order(req.body);

  // figure out total
  getTotal(req.body.products)
  .then(total => {
    obj.total = total;
    obj.save(err => {
      if (err) return sendJson(res, 400, err);
      sendJson(res, 201, obj);
    })
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
  
}

exports.updateOrder = function(req, res) {
  req.checkBody('price', 'Price must be a positive number').isPositive();

  var errors = req.validationErrors();
  if (errors) return sendJson(res, 400, {errors: errors});

  var id = req.params.id;
  var updatedObj = req.body;

  if (updatedObj.isActive === false && !updatedObj.discontinuedDate) updatedObj.discontinuedDate = Date.now();

  updateOrder(id, req.body)
  .then(results => {
    sendJson(res, 203, results);
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
}

exports.deleteOrder = function(req, res) {
  var id = req.params.id;
  // todo implement validator
  getOrderById(id)
  .then(results => {
    results.remove(err => {
      if (err) return sendJson(res, 400, results);
      sendJson(res, 204, {message: "Deleted sucessfully"});
    });
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
}

function getOrderById(id) {
  return new Promise((resolve, reject) => {
    Order.findById(id, (err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  })
}

function getOrders(query) {
  query = query || {};
  return new Promise((resolve, reject) => {
    Order.find(query, (err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  })
}

function updateOrder(id, updateParams) {
  return new Promise((resolve, reject) => {
    Order.findByIdAndUpdate(id, updateParams, (err) => {
      if (err) return reject({error: err.message});
      getOrderById(id)
      .then(results => { resolve(results) })
      .catch(err => { reject(err) });
    });
  })
}

function getTotal(products) {
  return new Promise((resolve, reject) => {
    var query = Product.find({});
    query
    .where('_id').in(products)
    // .where('active', true)
    .exec((err, results) => {
      if (err) return reject({error: err.message});
      // Check to make sure order ids provided were found in catalog
      var returnedIds = [];
      var invalidIds = [];
      
      results.forEach(result => {
        returnedIds.push(result.id);
      });
      products.forEach(product => {
        if (!returnedIds.includes(product)) invalidIds.push(product);
      });

      if (invalidIds.length > 0) return reject({invalidProducts: invalidIds});

      // calculate total if all product ids were found
      var total = 0;
      results.forEach(result => {
        total += result.price;
      });
      resolve(total);
    });
  })
}