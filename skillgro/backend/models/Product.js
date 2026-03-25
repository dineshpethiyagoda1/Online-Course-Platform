const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    slug:        { type: String, unique: true },
    description: { type: String },
    price:       { type: Number, required: true },
    originalPrice: { type: Number },
    category:    { type: String },
    emoji:       { type: String, default: '🎁' },
    thumbnail:   { type: String },
    badge:       { type: String, default: '' },
    rating:      { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock:       { type: Number, default: 100 },
    isDigital:   { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

