const router = require('express').Router();
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true }).populate('instructor', 'name initials avatarColor').sort('date');
    res.json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('instructor');
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/:id/register', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    if (event.attendees.includes(req.user._id))
      return res.status(400).json({ success: false, message: 'Already registered' });
    event.attendees.push(req.user._id);
    if (event.seatsLeft > 0) event.seatsLeft -= 1;
    await event.save();
    res.json({ success: true, message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
