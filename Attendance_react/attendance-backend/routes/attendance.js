const express = require('express');
const router = express.Router();
const {
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/attendanceController');

// Routes
router.get('/', getAttendance);
router.post('/', addAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
