(function(){
  'use strict';
    
    // Made into function to make sure that order of variable declation does not matter
    exports.getDataModels = getDataModels;

    
    function getDataModels() {
      return endpoints;
    }

    var endpoints = {
      heading: `All models have an <code>_id</code> parameter<br>
                All models have <code>createdAt</code> and <code>updatedAt</code> parameters that are set automatically by the system`,
      id: 'data-models',
      models: [
        {
          title: 'Customer',
          id: 'customer-model',
          list: [
            {
              field: 'firstName',
              type: 'String',
              required: true,
              default: null,
              unique: false,
              description: 'Customer first name.'
            },
            {
              field: 'lastName',
              type: 'String',
              required: true,
              default: null,
              unique: false,
              description: 'Customer last name.'
            },
            {
              field: 'email',
              type: 'String',
              required: true,
              default: null,
              unique: false,
              description: 'Must be properly formatted as email address.'
            },
            {
              field: 'phone',
              type: 'String',
              required: true,
              default: null,
              unique: false,
              description: 'Customer phone number.'
            },
            {
              field: 'createdBy',
              type: 'String',
              required: false,
              default: null,
              unique: false,
              description: null
            },
            {
              field: 'user',
              type: 'String',
              required: false,
              default: null,
              unique: false,
              description: 'This is set systematically by the name parameter from URL, if provided.'
            },
            {
              field: 'updatedAt',
              type: 'Date',
              required: false,
              default: null,
              unique: false,
              description: 'This field is systematically set.'
            },
            {
              field: 'createdAt',
              type: 'Date',
              required: false,
              default: null,
              unique: false,
              description: 'This field is systematically set.'
            }
          ]
        }, // end customer
        {
          title: 'Product',
          id: 'product-model',
          list: [
            {
              field: 'name',
              type: 'String',
              required: true,
              default: null,
              unique: false,
              description: 'Product name.'
            },
            {
              field: 'description',
              type: 'String',
              required: true,
              default: null,
              unique: false,
              description: 'Product description.'
            },
            {
              field: 'sku',
              type: 'String',
              required: true,
              default: null,
              unique: true,
              description: 'Product SKU.'
            },
            {
              field: 'price',
              type: 'Number',
              required: true,
              default: null,
              unique: false,
              description: 'Product price, must be a positive number.'
            },
            {
              field: 'active',
              type: 'String',
              required: false,
              default: 'true',
              unique: false,
              description: 'Denotes product as available to sell. If changed, discontinued date will be modified as well.'
            },
            {
              field: 'discontinuedDate',
              type: 'Date',
              required: false,
              default: null,
              unique: false,
              description: 'Automatically set or removed if active parameter is modified.'
            },
            {
              field: 'createdBy',
              type: 'String',
              required: false,
              default: null,
              unique: false,
              description: null
            },
            {
              field: 'user',
              type: 'String',
              required: false,
              default: null,
              unique: false,
              description: 'This is set systematically by the name parameter from URL, if provided.'
            },
            {
              field: 'updatedAt',
              type: 'Date',
              required: false,
              default: null,
              unique: false,
              description: 'This field is systematically set.'
            },
            {
              field: 'createdAt',
              type: 'Date',
              required: false,
              default: null,
              unique: false,
              description: 'This field is systematically set.'
            }
          ]
        }, // end product
        {
          title: 'Order',
          id: 'order-model',
          list: [
            {
              field: 'customer',
              type: 'Object Id',
              required: true,
              default: null,
              unique: false,
              description: 'Customer record Id.'
            },
            {
              field: 'products',
              type: 'Array',
              required: true,
              default: null,
              unique: false,
              description: 'Product description.',
              hasNested: true,
              nested: {
                type: 'Object',
                list: [
                  {
                    field: 'product',
                    type: 'Object Id',
                    required: true,
                    default: null,
                    unique: false,
                    description: 'Product record Id.'
                  },
                  {
                    field: 'quantity',
                    type: 'Number',
                    required: false,
                    default: '1',
                    unique: false,
                    description: 'Quantity of product for this order.'
                  },
                  {
                    field: 'originalPrice',
                    type: 'Number',
                    required: false,
                    default: null,
                    unique: false,
                    description: 'Cannot be set, this is returned with the catalog price at time of order.'
                  },
                  {
                    field: 'customerPrice',
                    type: 'Number',
                    required: false,
                    default: 'originalPrice',
                    unique: false,
                    description: 'Override catalog price with a customer specific price.'
                  },
                  {
                    field: 'extendedPrice',
                    type: 'Number',
                    required: false,
                    default: '0.00',
                    unique: false,
                    description: 'Systematically set, customerPrice * quantity.'
                  },
                  {
                    field: 'priceOverride',
                    type: 'Boolean',
                    required: false,
                    default: 'false',
                    unique: false,
                    description: 'True if customerPrice was specified.'
                  },
                  {
                    field: 'notes',
                    type: 'String',
                    required: false,
                    default: null,
                    unique: false,
                    description: 'Line item notes.'
                  },
                ]
              }
            },
            {
              field: 'notes',
              type: 'String',
              required: false,
              default: null,
              unique: false,
              description: 'Order notes.'
            },
            {
              field: 'status',
              type: 'String',
              required: false,
              default: 'Created, Not Shipped',
              unique: false,
              description: 'Order status.'
            },
            {
              field: 'orderDate',
              type: 'Date',
              required: false,
              default: null,
              unique: false,
              description: 'Set automatically at the time the order is created.'
            },
            {
              field: 'shippedDate',
              type: 'Date',
              required: false,
              default: 'null',
              unique: false,
              description: 'Automatically set when shipped gets set to true.'
            },
            {
              field: 'shipped',
              type: 'Boolean',
              required: false,
              default: 'false',
              unique: false,
              description: 'Denotes if order is shipped.'
            },
            {
              field: 'total',
              type: 'Number',
              required: false,
              default: '0.00',
              unique: false,
              description: 'Automatically set based on total of each order line.'
            },
            {
              field: 'orderCancelled',
              type: 'Boolean',
              required: false,
              default: 'false',
              unique: false,
              description: 'Cancel order, status updates automatically with this field neing passed in.'
            },
            {
              field: 'createdBy',
              type: 'String',
              required: false,
              default: null,
              unique: false,
              description: null
            },
            {
              field: 'user',
              type: 'String',
              required: false,
              default: null,
              unique: false,
              description: 'This is set systematically by the name parameter from URL, if provided.'
            },
            {
              field: 'updatedAt',
              type: 'Date',
              required: false,
              default: null,
              unique: false,
              description: 'This field is systematically set.'
            },
            {
              field: 'createdAt',
              type: 'Date',
              required: false,
              default: null,
              unique: false,
              description: 'This field is systematically set.'
            }
          ]
        }, // end order
        {
          title: 'Api Log',
          id: 'api-log-model',
          list: [
            {
              field: 'baseUrl',
              type: 'String'
            },
            {
              field: 'url',
              type: 'String'
            },
            {
              field: 'httpMethod',
              type: 'String'
            },
            {
              field: 'headers',
              type: 'Object'
            },
            {
              field: 'params',
              type: 'Object'
            },
            {
              field: 'body',
              type: 'Object'
            },
            {
              field: 'query',
              type: 'Object'
            },
            {
              field: 'responseStatus',
              type: 'String'
            },
            {
              field: 'callingIp',
              type: 'String'
            },
            {
              field: 'startTime',
              type: 'Date'
            },
            {
              field: 'stopTime',
              type: 'Date'
            },
            {
              field: 'duration',
              type: 'Number'
            },
            {
              field: 'user',
              type: 'String'
            }
          ]
        }

      ]
    }

})();
