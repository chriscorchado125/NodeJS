const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HomeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  resume: { type: String },
  linkedin: { type: String },
  azure: { type: String },
  created: { type: Date, default: Date.now },
  modified: { type: Date }
  // technology_reference: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Technology',
  //   required: true,
  // },
})

module.exports = mongoose.model('Home', HomeSchema)
