const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true },
    slug:         { type: String, unique: true },
    role:         { type: String },           // e.g. "UX Design Lead"
    bio:          { type: String },
    avatar:       { type: String },
    initials:     { type: String },           // for fallback avatar
    avatarColor:  { type: String, default: '#c8ff00' },
    expertise:    [{ type: String }],         // e.g. ['React', 'Node.js', 'MongoDB']
    rating:       { type: Number, default: 0 },
    studentCount: { type: Number, default: 0 },
    courseCount:  { type: Number, default: 0 },
    social: {
      twitter:  String,
      linkedin: String,
      website:  String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

instructorSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Instructor', instructorSchema);
