const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  company_name: { type: String },
  // company_reference: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Company',
  //   required: true,
  // },
  screenshots: { type: Array },
  videos: { type: String },
  technology: { type: String },
  project_date: { type: Date },
  // technology_reference: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Technology',
  //   required: true,
  // },
  created: { type: Date, default: Date.now },
  modified: { type: Date }
})

module.exports = mongoose.model('Project', ProjectSchema)
