const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Resume = new Schema({
  description: { type: String, required: true },
  modified: { type: Date }
})

module.exports = mongoose.model('ResumeHtml', Resume)
