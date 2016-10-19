var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  notes: String,
  status: { type: String, default: "Created, Not Shipped" },
  orderDate: { type: Date },
  shippedDate: { type: Date, default: Date.now },
  shipped: { type: Boolean, default: false },
  total: {Type: Number, default: 0.00 },
  createdBy: { type: String }
}, schemaOptions);

module.exports = mongoose.model('Order', orderSchema);