var util = require('util');
var moment = require('moment');
var expressValidator = require('express-validator');

var Order = require('../models/order');
var Product = require('../models/product');
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

exports.getOrders = function(req, res) {
  getOrders({}, req.query.full, req.params.user, req.query.limit, req.query.page)
  .then(results => {
    sendJson(res, 200, results);
  })
  .catch(err => {
    sendJson(res, 400, err);
  });
}

exports.getOrder = function(req, res) {
  var id = req.params.id;

  getOrderById(id, req.query.full, req.params.user)
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
    if (req.params.user) obj.user = req.params.user;
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

  var validParams = ['shipped', 'notes', 'status', 'orderCancelled'];

  var id = req.params.id;
  var updatedParams = {};
  validParams.forEach(param => {
    if (req.body[param]) updatedParams[param] = req.body[param];
  });

  // Make sure at least one valid parameter is included
  if (Object.keys(updatedParams).length === 0) {
    return sendJson(res, 400, {errors: `No valid parameters were provided to update.  Valid parameters are: ${validParams.join(', ')}`});
  }
  if (updatedParams.shipped) updatedParams.shippedDate = Date.now();
  if (updatedParams.shipped && !updatedParams.status) updatedParams.status = 'Order has been shipped';
  if (updatedParams.orderCancelled) {
    updatedParams.status = "Order cancelled";
  } else if (updatedParams.orderCancelled === false) {
    updatedParams.status = "Order reinstated";
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
  getOrderById(id, req.params.user)
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

function getOrderById(id, populateSubDocs, user) {
  return new Promise((resolve, reject) => {
    var query = {_id: id};
    if (user) query.user = user;
    var q = Order.findOne(query);
    q = populate(q, populateSubDocs);
    q.exec((err, results) => {
      if (err) return reject({error: err.message});
      resolve(results);
    });
  })
}

function getOrders(query, populateSubDocs, user, limit, page) {
  page = page || 0;
  page = parseInt(page);
  limit = limit || 100;
  limit = parseInt(limit);
  query = query || {};
  if (user) query.user = user;
  return new Promise((resolve, reject) => {
    Order.find(query)
    .populate(populateSubDocs)
    .limit(limit)
    .skip(limit * page)
    .sort({createdAt: 'asc'})
    .exec((err, results) => {
      if (err) return reject({error: err.message});
      Order.count(query).exec((err, count) => {
        var pagination;
        if (err) {
          pagination = {error: 'Could not calculate pagination', err: err};
        } else {
          pagination = {page: page, limit: limit, pageCount: Math.ceil(count / limit), total: count};
        }
        resolve({results: results, pagination: pagination});
      });
    });
  });
}

function updateOrder(id, updateParams, user) {
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
          p.quantity = p.quantity || 1;
          p.quantity = Number.parseFloat(p.quantity.toFixed(0));
          p.originalPrice = productPrices[p.product].price;
          
          // Set customer price if needed and determine if price overrice was specified
          if (p.customerPrice != 0 && !p.customerPrice) {
            p.customerPrice = p.originalPrice;
            p.priceOverride = false;
          } else if (p.customerPrice != p.originalPrice) {
            p.priceOverride = true;
          } else {
            p.priceOverride = false;
          }
          p.originalPrice = Number.parseFloat(p.originalPrice.toFixed(2));
          p.customerPrice = Number.parseFloat(p.customerPrice.toFixed(2));
          p.extendedPrice = Number.parseFloat((p.quantity * p.customerPrice).toFixed(2));
          order.total += p.extendedPrice;
        } else {
          return reject({error: 'One or more provided products do not exist in catalog'});
        }
      });
      resolve(order);
    });
  })
}

