const router = require('express').Router();
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getCourses);
router.get('/:slug', getCourse);
router.post('/', protect, authorize('admin', 'instructor'), createCourse);
router.put('/:id', protect, authorize('admin', 'instructor'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
