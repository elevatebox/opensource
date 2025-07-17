import { useState, useEffect } from "react";
import { addAttendance, getAttendance, deleteAttendance } from "./services/attendanceService";
import * as XLSX from "xlsx";
import "./App.css";
import "./theme.css";

function App() {
  const [form, setForm] = useState({ studentId: "", attendanceDate: "", isPresent: false });
  const [attendances, setAttendances] = useState([]);

  const fetchData = async () => {
    const { data } = await getAttendance();
    setAttendances(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAttendance(form);
    setForm({ studentId: "", attendanceDate: "", isPresent: false });
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteAttendance(id);
    fetchData();
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendances);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "attendance.xlsx");
  };

  const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="container">
      <header>
        <h1>Attendance Manager</h1>
        <button className="theme-toggle" onClick={toggleTheme}>Toggle Theme</button>
      </header>

      <form className="attendance-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Student ID" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} required />
        <input type="date" value={form.attendanceDate} onChange={(e) => setForm({ ...form, attendanceDate: e.target.value })} required />
        <label className="checkbox-label">
          <input type="checkbox" checked={form.isPresent} onChange={(e) => setForm({ ...form, isPresent: e.target.checked })} /> Present
        </label>
        <button type="submit">Add Attendance</button>
      </form>

      <section className="attendance-list">
        <button className="download-btn" onClick={downloadExcel}>Download Excel</button>
        <ul>
          {attendances.map((att) => (
            <li key={att._id}>
              <div>
                <strong>{att.studentId}</strong> - {new Date(att.attendanceDate).toLocaleDateString()} - {att.isPresent ? "Present" : "Absent"}
              </div>
              <button className="delete-btn" onClick={() => handleDelete(att._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
