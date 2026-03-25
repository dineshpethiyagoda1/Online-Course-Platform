const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();

// ── Disable ETag so API responses are never served as 304 from cache ──
app.set('etag', false);

// ── Middleware ──
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ── Static uploads ──
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ──
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/courses',     require('./routes/courses'));
app.use('/api/instructors', require('./routes/instructors'));
app.use('/api/events',      require('./routes/events'));
app.use('/api/blog',        require('./routes/blog'));
app.use('/api/shop',        require('./routes/shop'));
app.use('/api/contact',     require('./routes/contact'));
app.use('/api/enrollments', require('./routes/enrollments'));

// ── Health check ──
app.get('/api/health', (req, res) => res.json({ status: 'OK', time: new Date() }));

// ── 404 handler ──
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ── Error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message,
  });
});

// ── DB + Server ──
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;
