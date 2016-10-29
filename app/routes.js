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

  module.exports = router;

})();
