const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @POST /api/enrollments  — enroll in a course
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log('Enrolling user:', req.user._id, 'in course:', courseId);
    const existing = await Enrollment.findOne({ user: req.user._id, course: courseId });
    if (existing) return res.status(400).json({ success: false, message: 'Already enrolled' });

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
      amountPaid: req.body.amountPaid || 0,
    });
    console.log('Enrollment created:', enrollment._id);

    await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
    res.status(201).json({ success: true, enrollment });
  } catch (err) {
    console.error('Enrollment error:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// @GET /api/enrollments/my
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course', 'title slug emoji category instructor price duration rating');
    res.json({ success: true, enrollments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/enrollments/:id/progress
exports.updateProgress = async (req, res) => {
  try {
    const { progress, completedLessons } = req.body;
    const enrollment = await Enrollment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        progress,
        completedLessons,
        isCompleted: progress >= 100,
        completedAt: progress >= 100 ? new Date() : undefined,
      },
      { new: true }
    );
    if (!enrollment) return res.status(404).json({ success: false, message: 'Enrollment not found' });
    res.json({ success: true, enrollment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

