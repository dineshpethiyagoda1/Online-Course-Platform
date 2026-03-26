const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course:     { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    progress:   { type: Number, default: 0 },      // 0–100
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
    isCompleted:{ type: Boolean, default: false },
    completedAt:{ type: Date },
    certificate:{ type: String },                  // URL
    amountPaid: { type: Number },
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);

