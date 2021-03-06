const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  icon: { type: String },
  url: { type: String },
  screenshots: { type: String },
  city: { type: String },
  state: { type: String },
  job_title: { type: String },
  job_type: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  created: { type: Date, default: Date.now },
  modified: { type: Date }
  // Project_reference: { type: Schema.Types.ObjectId, ref: 'Technology', required: true },
})

module.exports = mongoose.model('Company', CompanySchema)
