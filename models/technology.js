var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TechnologySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  icon: { type: String },
  url: { type: String },
  created: { type: Date, default: Date.now },
  modified: { type: Date },
});

module.exports = mongoose.model('Technology', TechnologySchema);
