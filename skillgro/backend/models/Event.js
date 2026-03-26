const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    slug:        { type: String, unique: true },
    description: { type: String },
    date:        { type: Date, required: true },
    time:        { type: String },
    location:    { type: String },
    isOnline:    { type: Boolean, default: false },
    meetingLink: { type: String },
    price:       { type: Number, default: 0 },
    isFree:      { type: Boolean, default: true },
    seats:       { type: Number },
    seatsLeft:   { type: Number },
    thumbnail:   { type: String },
    emoji:       { type: String, default: '🎓' },
    category:    { type: String },
    instructor:  { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    attendees:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    badge:       { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

eventSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);

