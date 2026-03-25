const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true },
    slug:      { type: String, unique: true },
    excerpt:   { type: String },
    content:   { type: String },
    thumbnail: { type: String },
    emoji:     { type: String, default: '✍️' },
    category:  { type: String },
    tags:      [String],
    author: {
      name:    String,
      initials:String,
      color:   String,
    },
    readTime:  { type: String },
    views:     { type: Number, default: 0 },
    likes:     { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

blogSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);

