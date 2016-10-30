var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  products: [{
    _id: false,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: { type: Number, default: 1 },
    originalPrice: { type: Number },
    customerPrice: { type: Number },
    extendedPrice: { type: Number },
    priceOverride: { type: Boolean, default: false },
    notes: { type: String }
  }],
  notes: String,
  status: { type: String, default: "Created, Not Shipped" },
  orderDate: { type: Date },
  shippedDate: { type: Date, default: null },
  shipped: { type: Boolean, default: false },
  total: { type: Number, default: 0.00 },
  orderCancelled: { type: Boolean, default: false },
  createdBy: { type: String },
  user: { type: String }
}, schemaOptions);

module.exports = mongoose.model('Order', orderSchema);