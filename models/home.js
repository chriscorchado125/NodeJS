var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  resume: { type: String },
  linkedin: { type: String },
  azure: { type: String },
  // technology_reference: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Technology',
  //   required: true,
  // },
});

module.exports = mongoose.model('Home', HomeSchema);
