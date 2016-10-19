var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  createdBy: { type: String }
}, schemaOptions);

module.exports = mongoose.model('Customer', customerSchema);
