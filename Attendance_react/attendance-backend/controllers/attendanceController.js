const Attendance = require('../models/Attendance');

// @desc    Get all attendance records
exports.getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    next(error);
  }
};

// @desc    Add new attendance record
exports.addAttendance = async (req, res, next) => {
  try {
    const newRecord = await Attendance.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    next(error);
  }
};

// @desc    Update attendance record
exports.updateAttendance = async (req, res, next) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Record not found' });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete attendance record
exports.deleteAttendance = async (req, res, next) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (error) {
    next(error);
  }
};
