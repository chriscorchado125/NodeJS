var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthoritySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  icon: { type: String },
  url: { type: String },
});

//Export model
module.exports = mongoose.model('Authority', AuthoritySchema);
