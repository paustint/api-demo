# API Demo

This program is product for an hands-on demo to give folks an idea of what working with API's is all about.

- Docs: [https://documenter.getpostman.com/collection/view/8674-e96dcebd-78f5-9286-da97-f77f2026bb95] (https://documenter.getpostman.com/collection/view/8674-e96dcebd-78f5-9286-da97-f77f2026bb95)
- Endpoint: https://atg-api-demo.herokuapp.com/


## Valid Endpoints:
  - get '/customer'
  - get '/customer/:id'
  - post '/customer'
  - put '/customer/:id'
  - delete '/customer/:id'

  - get '/product'
  - get '/product/:id'
  - post '/product'
  - put '/product/:id'
  - delete '/product/:id'

  - get '/order'
  - get '/order/:id'
  - post '/order'
  - put '/order/:id'
  - delete '/order/:id'

## Data Models:
  
  - **Customer**:

    
    post:

    ```javascript
    {
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": "",
      "createdBy": ""
    }
    ```
    
    _put_:

    ```javascript
    {
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": ""
    }
    ```
  
  - **Product**:

    
    _post_:

    ```javascript
    {
      "name": "",
      "description": "",
      "sku": "",
      "price": 0.00,
      "active": true,
      "createdBy": ""
    }
    ```
    
    _put_:

    ```javascript
    {
      "name": "",
      "description": "",
      "sku": "",
      "price": 12.33,
      "active": false
    }
    ```
  
  - **Order**:

    
    _post_:

    ```javascript
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
    ```
    
    put:

    ```javascript
    {
      "shipped": true,
      "notes": "updated notes",
      "status": "some status"
    }
    ```