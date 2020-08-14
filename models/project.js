var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  company_reference: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  screenshots: { type: String },
  videos: { type: String },
  project_date: { type: Date },
  technology_reference: {
    type: Schema.Types.ObjectId,
    ref: 'Technology',
    required: true,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
