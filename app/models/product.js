var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var productSchema = new mongoose.Schema({
  name: String,
  description: String,
  sku: {type: String, unique: true},
  price: {type: Number },
  active: { type: Boolean, default: true },
  discontinuedDate: { type: Date },
  createdBy: { type: String }
}, schemaOptions);

module.exports = mongoose.model('Product', productSchema);
