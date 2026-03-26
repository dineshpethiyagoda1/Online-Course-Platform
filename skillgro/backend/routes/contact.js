const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    if (!firstName || !email || !message)
      return res.status(400).json({ success: false, message: 'Please fill required fields' });

    // In production: send email via nodemailer / SendGrid
    console.log('📬 Contact form submission:', { firstName, lastName, email, subject, message });

    res.json({ success: true, message: 'Message received! We\'ll get back to you within 24 hours.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
