(function(){
  'use strict';

  var express = require('express');
  var router = express.Router();
  // Models
  var ApiLog = require('./models/ApiLog');

  // Controllers
  var CustomerController = require('./controllers/customer');
  var ProductController = require('./controllers/product');
  var OrderController = require('./controllers/order');
  var ApiLogController = require('./controllers/apiLog');

/////////////// MIDDLEWARE ///////////////////////////////////

router.use(function (req, res, next) {
  var apiLog = new ApiLog();
  apiLog.baseUrl = req.baseUrl;
  apiLog.url = req.originalUrl;
  apiLog.headers = req.headers;
  apiLog.httpMethod = req.method;
  apiLog.params = req.params;
  apiLog.body = req.body;
  apiLog.query = req.query;
  apiLog.callingIp = req.connection.remoteAddress;
  apiLog.startTime = Date.now();

  req.apiLog = apiLog;

  next();
});


/////////////// ROUTES ///////////////////////////////////
  
  

  router.get('/customer', CustomerController.getCustomers);
  router.get('/customer/:id', CustomerController.getCustomer);
  router.post('/customer', CustomerController.createCustomer);
  router.put('/customer/:id', CustomerController.updateCustomer);
  router.delete('/customer/:id', CustomerController.deleteCustomer);

  router.get('/product', ProductController.getProducts);
  router.get('/product/:id', ProductController.getProduct);
  router.post('/product', ProductController.createProduct);
  router.put('/product/:id', ProductController.updateProduct);
  router.delete('/product/:id', ProductController.deleteProduct);

  router.get('/order', OrderController.getOrders);
  router.get('/order/:id', OrderController.getOrder);
  router.post('/order', OrderController.createOrder);
  router.put('/order/:id', OrderController.updateOrder);
  router.delete('/order/:id', OrderController.deleteOrder);

  // Duplicated paths to allow restricting visible records to a specific user

  router.get('/:user/customer', CustomerController.getCustomers);
  router.get('/:user/customer/:id', CustomerController.getCustomer);
  router.post('/:user/customer', CustomerController.createCustomer);
  router.put('/:user/customer/:id', CustomerController.updateCustomer);
  router.delete('/:user/customer/:id', CustomerController.deleteCustomer);

  router.get('/:user/product', ProductController.getProducts);
  router.get('/:user/product/:id', ProductController.getProduct);
  router.post('/:user/product', ProductController.createProduct);
  router.put('/:user/product/:id', ProductController.updateProduct);
  router.delete('/:user/product/:id', ProductController.deleteProduct);

  router.get('/:user/order', OrderController.getOrders);
  router.get('/:user/order/:id', OrderController.getOrder);
  router.post('/:user/order', OrderController.createOrder);
  router.put('/:user/order/:id', OrderController.updateOrder);
  router.delete('/:user/order/:id', OrderController.deleteOrder);

  /// STATS
  router.get('/:user/apiLog', ApiLogController.getApiLogs);
  router.get('/apiLog', ApiLogController.getApiLogs);


  module.exports = router;

})();
