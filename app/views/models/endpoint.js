(function(){
  'use strict';
    
    // Made into function to make sure that order of variable declation does not matter
    exports.getEndpoints = getEndpoints;

    
    function getEndpoints() {
      return endpoints;
    }

    var endpoints = {
      heading: `All endpoints start with the base URL of <code>https://atg-api-demo.herokuapp.com/</code><br>
            All parameters with curly brackets <code>{}</code> should be replaced with actual value<br>
            <code>{name}</code> is an arbitrary name set by the user, such as your first or last name<br>
            The <code>{name}</code> parameter is optional and will sandbox the actions to just results with that prefix<br>
            For example, to get ALL customers, call <code>/api/customer</code> instead of <code>/api/{name}/customer</code>`,
      id: 'endpoints',
      endpoints: [
        {
          title: 'Customer',
          id: 'customer-endpoints',
          list: [
            {
              method: 'GET',
              endpoint: '/api/{name}/customer',
              label: 'success',
              query: [
                {
                  name: 'limit',
                  type: 'integer',
                  description: 'Number of records to return, defaults to 100 if not provided.'
                },
                {
                  name: 'page',
                  type: 'integer',
                  description: 'Page number to return, defaults to 0 if not provided.'
                }
              ],
              payload: null,
              validFields: null
            },
            {
              method: 'GET',
              endpoint: '/api/{name}/customer/{id}',
              label: 'success',
              query: null,
              payload: null,
              validFields: null
            },
            {
              method: 'POST',
              endpoint: '/api/{name}/customer',
              label: 'info',
              query: null,
              payload: JSON.stringify({
                "firstName": "jack",
                "lastName": "johnson",
                "email": "test@test1.com"
              },undefined,2),
              validFields: null
            },
            {
              method: 'PUT',
              endpoint: '/api/{name}/customer/{id}',
              label: 'warning',
              query: null,
              payload: JSON.stringify({
                'firstName': 'jack',
                'lastName': 'johnson',
                'email': 'test@test1.com'
              },null,2),
              validFields: JSON.stringify(['firstName','lastName','email','phone'])
            },
            {
              method: 'DELETE',
              endpoint: '/api/{name}/customer/{id}',
              label: 'danger',
              query: null,
              payload: null,
              validFields: null
            }
          ]
        }, // end customer
        {
          title: 'Product',
          id: 'product-endpoints',
          list: [
            {
              method: 'GET',
              endpoint: '/api/{name}/product',
              label: 'success',
              query: [
                {
                  name: 'limit',
                  type: 'integer',
                  description: 'Number of records to return, defaults to 100 if not provided.'
                },
                {
                  name: 'page',
                  type: 'integer',
                  description: 'Page number to return, defaults to 0 if not provided.'
                }
              ],
              payload: null,
              validFields: null
            },
            {
              method: 'GET',
              endpoint: '/api/{name}/product/{id}',
              label: 'success',
              query: null,
              payload: null,
              validFields: null
            },
            {
              method: 'POST',
              endpoint: '/api/{name}/product',
              label: 'info',
              query: null,
              payload: JSON.stringify({
                "name": "Test Product",
                "description": "This is a cool product",
                "sku": "COOL1234",
                "price": 0.01,
                "active": true,
                "createdBy": "Admin"
              },undefined,2),
              validFields: null
            },
            {
              method: 'PUT',
              endpoint: '/api/{name}/product/{id}',
              label: 'warning',
              query: null,
              payload: JSON.stringify({
                "name": "Test Product",
                "description": "This is a cool product description and is updated",
                "sku": "COOL12345",
                "price": 0.02,
                "active": false
              },null,2),
              validFields: JSON.stringify(["name","description","sku","price","active"])
            },
            {
              method: 'DELETE',
              endpoint: '/api/{name}/product/{id}',
              label: 'danger',
              query: null,
              payload: null,
              validFields: null
            }
          ]
        }, // end product
        {
          title: 'Order',
          id: 'order-endpoints',
          list: [
            {
              method: 'GET',
              endpoint: '/api/{name}/order',
              label: 'success',
              query: [
                {
                  name: 'full',
                  type: 'boolean',
                  description: 'returns full product information if true.'
                },
                {
                  name: 'limit',
                  type: 'integer',
                  description: 'Number of records to return, defaults to 100 if not provided.'
                },
                {
                  name: 'page',
                  type: 'integer',
                  description: 'Page number to return, defaults to 0 if not provided.'
                }
              ],
              payload: null,
              validFields: null
            },
            {
              method: 'GET',
              endpoint: '/api/{name}/order/{id}',
              label: 'success',
              query: [
                {
                  name: 'full',
                  type: 'boolean',
                  description: 'returns full product information if true.'
                }
              ],
              payload: null,
              validFields: null
            },
            {
              method: 'POST',
              endpoint: '/api/{name}/order',
              label: 'info',
              query: null,
              payload: JSON.stringify({
                "customer": "5806e2a1759fd9ad7a1f60eb",
                "products": [
                  {
                  "product": "5806e7e3d0073cb4d2946aad",
                  "customerPrice": 100,
                  "notes": "Customer has an overriden price on this product"
                },
                {
                  "product": "5806e7e3d007425fdb4d2946aad"
                }
                ],
                "notes": "some optional order notes"
              },undefined,2),
              validFields: null
            },
            {
              method: 'PUT',
              endpoint: '/api/{name}/order/{id}',
              label: 'warning',
              query: null,
              payload: JSON.stringify({
                "notes": "Notes for an order can be updated",
                "shipped": true
              },null,2),
              validFields: JSON.stringify(["shipped","notes","status", "orderCancelled"])
            },
            {
              method: 'DELETE',
              endpoint: '/api/{name}/order/{id}',
              label: 'danger',
              query: null,
              payload: null,
              validFields: null
            }
          ]
        }, // end order
        {
          title: 'Api Log',
          id: 'apiLog-endpoints',
          list: [
            {
              method: 'GET',
              endpoint: '/api/{name}/apiLog',
              label: 'success',
              query: [
                {
                  name: 'page',
                  type: 'integer',
                  description: 'Page number to return, defaults to 0 if not provided.'
                },
                {
                  name: 'limit',
                  type: 'integer',
                  description: 'Number of records to return, defaults to 100 if not provided.'
                },
              ],
              payload: null,
              validFields: null
            }
          ]
        } // end apiLog
      ]
    }

})();
