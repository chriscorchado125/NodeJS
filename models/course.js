var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: { type: String, required: true },
  technology_reference: {
    type: Schema.Types.ObjectId,
    ref: 'Technology',
    required: true,
  },
  authority_reference: { type: Schema.Types.ObjectId, ref: 'Authority', required: true },
  certificate_pdf: { type: String, required: true },
  certificate_image: { type: String, required: true },
  course_date: { type: Date },
});

//Export model
module.exports = mongoose.model('Course', CourseSchema);
