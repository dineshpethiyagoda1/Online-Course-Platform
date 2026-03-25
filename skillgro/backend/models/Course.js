const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  duration: { type: String },        // e.g. "12:30"
  videoUrl: { type: String },
  isFree:   { type: Boolean, default: false },
  order:    { type: Number },
});

const courseSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, unique: true },
    description: { type: String, required: true },
    shortDesc:   { type: String },
    thumbnail:   { type: String, default: '' },
    emoji:       { type: String, default: '📚' },
    category:    { type: String, required: true },
    level:       { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'], default: 'All Levels' },
    price:       { type: Number, required: true },
    originalPrice: { type: Number },
    badge:       { type: String, enum: ['Hot!', 'New', 'Sale', ''], default: '' },

    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },

    lessons:  [lessonSchema],
    duration: { type: String },           // total e.g. "11h 20m"
    language: { type: String, default: 'English' },

    rating:        { type: Number, default: 0 },
    reviewCount:   { type: Number, default: 0 },
    enrolledCount: { type: Number, default: 0 },

    tags:       [String],
    whatYouLearn: [String],
    requirements: [String],

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate slug
courseSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
