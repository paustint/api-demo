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
  getOrders({}, req.query.full)
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
}

exports.getOrder = function(req, res) {
  var id = req.params.id;

  getOrderById(id, req.query.full)
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
}

exports.createOrder = function(req, res) {
  req.checkBody('customer', 'Customer is required').notEmpty();
  req.checkBody('products', 'Products are required').notEmpty();

  var errors = req.validationErrors();
  if (errors) return sendJson(res, 400, {errors: errors});

  // set prices and prepare data
  setProductPrices(req.body)
  .then(orderObj => {
    var obj = new Order(orderObj);
    console.log('orderObj', orderObj);
    console.log('obj', obj);
    obj.save(err => {
      if (err) return sendJson(res, 400, err);
      sendJson(res, 201, obj);
    });
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
  
}

exports.updateOrder = function(req, res) {
  req.checkBody('shipped', 'Shipped must be a boolean').optional().isBoolean();

  var errors = req.validationErrors();
  if (errors) return sendJson(res, 400, {errors: errors});

  var validParams = ['shipped', 'notes', 'status'];

  var id = req.params.id;
  var updatedParams = {};
  validParams.forEach(param => {
    if (req.body[param]) updatedParams[param] = req.body[param];
  });

  // Make sure at least one valid parameter is included
  if (Object.keys(updatedParams).length === 0) {
    return sendJson(res, 400, {errors: `No valid parameters were provided to update.  Valid parameters are: ${validParams.join(', ')}`});
  }

  updateOrder(id, updatedParams)
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
    if (!results) return sendJson(res, 400, {errors: 'Record could not be found with provided id'});
    results.remove(err => {
      if (err) return sendJson(res, 400, results);
      sendJson(res, 204, {message: "Deleted sucessfully"});
    });
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
}


/////////// QUERY FUNCTIONS /////////////////

function getOrderById(id, populateSubDocs) {
  return new Promise((resolve, reject) => {
    var q = Order.findById(id);
    q = populate(q, populateSubDocs);
    q.exec((err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  })
}

function getOrders(query, populateSubDocs) {
  query = query || {};
  return new Promise((resolve, reject) => {
    var q = Order.find(query);
    q = populate(q, populateSubDocs);
    q.exec((err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  });
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

///////// HELPER FUNCTIONS ////////////

function populate(query, populateSubDocs) {
  try {
    populateSubDocs = populateSubDocs.toLowerCase();
    if (populateSubDocs.startsWith('t')) {
      query
      .populate({ path: 'customer' })
      .populate({
        path: 'products.product',
        model: 'Product'
      });
    }
    return query;
  } catch (ex) {
    return query;
  }
}

function setProductPrices(order) {
  return new Promise((resolve, reject) => {
    var productPrices = {}; // {'123': {product obj}}
    var productIds = order.products.map(p => {
      return p.product;
    });
    Product.find({})
    .where('_id').in(productIds)
    // .where('active', true)
    .exec((err, results) => {
      if (err) return reject({error: err.message});
      // Check to make sure order ids provided were found in catalog
      // Save all returned product id's and prices'
      results.map(p => {
        productPrices[p._id] = p;
      });
      order.total = 0;
      order.products.forEach(p => {
        if (productPrices[p.product]) {
          p.originalPrice = productPrices[p.product].price;
          order.total += p.originalPrice;
          // Set customer price if needed and determine if price overrice was specified
          if (p.customerPrice != 0 && !p.customerPrice) {
            p.customerPrice = p.originalPrice;
            p.priceOverride = false;
          } else if (p.customerPrice != p.originalPrice) {
            p.priceOverride = true;
          } else {
            p.priceOverride = false;
          }
        } else {
          return reject({error: 'One or more provided products do not exist in catalog'});
        }
      });
      resolve(order);
    });
  })
}