# API Demo

This program is product for an hands-on demo to give folks an idea of what working with API's is all about.

Valid Endpoints:
  get '/customer'
  get '/customer/:id'
  post '/customer'
  put '/customer/:id'
  delete '/customer/:id'

  get '/product'
  get '/product/:id'
  post '/product'
  put '/product/:id'
  delete '/product/:id'

  get '/order'
  get '/order/:id'
  post '/order'
  put '/order/:id'
  delete '/order/:id'

Data Models:
  Customer:
    post:
    {
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": "",
      "createdBy": ""
    }
    Put:
    {
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": ""
    }
  Product:
    post:
    {
      "name": "",
      "description": "",
      "sku": "",
      "price": 0.00,
      "active": true,
      "createdBy": ""
    }
    Put:
    {
      "name": "",
      "description": "",
      "sku": "",
      "price": 12.33,
      "active": false
    }
  Order:
    post:
    {
      "customer": "5806e2a1759fd9ad7a1f60eb",
      "products": [{
        "product": "5806e7e3d0073cb4d2946aad",
        "customerPrice": 100,
        "notes": "test"
      }],
      "notes": "some optional order notes",
      "createdBy": "test"
    }
    put:
    {
      "shipped": true,
      "notes": "updated notes",
      "status": "some status"
    }