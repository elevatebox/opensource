import { useState } from 'react';
import { addAttendance } from '../services/attendanceService';

function AttendanceForm({ refreshData }) {
  const [form, setForm] = useState({ studentId: '', attendanceDate: '', isPresent: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAttendance(form);
    setForm({ studentId: '', attendanceDate: '', isPresent: false });
    refreshData();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Student ID"
        value={form.studentId}
        onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        required
      />
      <input
        type="date"
        value={form.attendanceDate}
        onChange={(e) => setForm({ ...form, attendanceDate: e.target.value })}
        required
      />
      <label>
        Present:
        <input
          type="checkbox"
          checked={form.isPresent}
          onChange={(e) => setForm({ ...form, isPresent: e.target.checked })}
        />
      </label>
      <button type="submit">Add Attendance</button>
    </form>
  );
}

export default AttendanceForm;
