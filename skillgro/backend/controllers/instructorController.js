const Instructor = require('../models/Instructor');
const Course = require('../models/Course');

exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find({});
    res.json({ instructors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({
      slug: req.params.slug
    });

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // 🔥 THIS LINE FIXES EMPTY COURSES
    const courses = await Course.find({
      instructor: instructor._id
    });

    res.json({
      instructor,
      courses
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.create(req.body);
    res.status(201).json({ success: true, instructor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!instructor)
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    res.json({ success: true, instructor });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOneAndDelete({ slug: req.params.slug });
    if (!instructor)
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    res.json({ success: true, message: 'Instructor deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
