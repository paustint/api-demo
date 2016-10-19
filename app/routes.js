(function(){
  'use strict';

  var express = require('express');
  var router = express.Router();

  // Controllers
  var CustomerController = require('./controllers/customer');
  var ProductController = require('./controllers/product');
  var OrderController = require('./controllers/order');
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

  module.exports = router;

})();
