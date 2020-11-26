var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Resume = new Schema({
  description: { type: String, required: true },
  modified: { type: Date },
});

module.exports = mongoose.model('ResumeHtml', Resume);
