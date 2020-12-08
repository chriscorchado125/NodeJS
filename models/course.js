const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  name: { type: String, required: true },
  // technology_reference: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Technology',
  //   required: true,
  // },
  // authority_reference: { type: Schema.Types.ObjectId, ref: 'Authority', required: true },
  certificate_pdf: { type: String, required: true },
  certificate_image: { type: String, required: true },
  track_image: { type: String },
  course_date: { type: Date },
  created: { type: Date, default: Date.now },
  modified: { type: Date }
})

module.exports = mongoose.model('Course', CourseSchema)
