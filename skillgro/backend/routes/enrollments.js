const router = require('express').Router();
const { enrollCourse, getMyEnrollments, updateProgress } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.post('/', protect, enrollCourse);
router.get('/my', protect, getMyEnrollments);
router.put('/:id/progress', protect, updateProgress);

module.exports = router;

