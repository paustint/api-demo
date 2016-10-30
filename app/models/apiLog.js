var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true
};

var apiLogSchema = new mongoose.Schema({
  baseUrl: String,
  url: String,
  httpMethod: String,
  headers: mongoose.Schema.Types.Mixed, 
  params: mongoose.Schema.Types.Mixed,
  body: mongoose.Schema.Types.Mixed,
  query: mongoose.Schema.Types.Mixed,
  responseStatus: String,
  callingIp: String,
  startTime: Date,
  stopTime: Date,
  duration: Number,
  user: String,
}, schemaOptions);

module.exports = mongoose.model('ApiLog', apiLogSchema);
