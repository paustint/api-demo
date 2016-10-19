var moment = require('moment');
var expressValidator = require('express-validator');

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

exports.getProducts = function(req, res) {
  getProducts()
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, results);
  });
}

exports.getProduct = function(req, res) {
  var id = req.params.id;

  getProductById(id)
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, results);
  });
}

exports.createProduct = function(req, res) {
  req.checkBody('name', 'Product name is required').notEmpty();
  req.checkBody('description', 'Product description name is required').notEmpty();
  req.checkBody('sku', 'SKU is required').notEmpty();
  req.checkBody('price', 'Price is requied').notEmpty();
  req.checkBody('price', 'Price must be a decimal').optional().isDecimal();
  req.checkBody('price', 'Price must be a positive number').optional().isPositive();

  var errors = req.validationErrors();
  if (errors) return sendJson(res, 400, {errors: errors});

  var obj = new Product(req.body);

  obj.save(err => {
    if (err) return sendJson(res, 400, err.message);
    sendJson(res, 201, obj);
  })
}

exports.updateProduct = function(req, res) {
  req.checkBody('price', 'Price must be a positive number').isPositive();

  var errors = req.validationErrors();
  if (errors) return sendJson(res, 400, {errors: errors});

  var id = req.params.id;
  var updatedObj = req.body;

  if (updatedObj.isActive === false && !updatedObj.discontinuedDate) updatedObj.discontinuedDate = Date.now();

  updateProduct(id, req.body)
  .then(results => {
    sendJson(res, 203, results);
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
}

exports.deleteProduct = function(req, res) {
  var id = req.params.id;
  // todo implement validator
  getProductById(id)
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

function getProductById(id) {
  return new Promise((resolve, reject) => {
    Product.findById(id, (err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  })
}

function getProducts(query) {
  query = query || {};
  return new Promise((resolve, reject) => {
    Product.find(query, (err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  })
}

function updateProduct(id, updateParams) {
  return new Promise((resolve, reject) => {
    Product.findByIdAndUpdate(id, updateParams, (err) => {
      if (err) return reject({error: err.message});
      getProductById(id)
      .then(results => { resolve(results) })
      .catch(err => { reject(err) });
    });
  })
}