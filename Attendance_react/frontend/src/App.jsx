import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [attendance, setAttendance] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    attendanceDate: "",
    isPresent: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance");
      setAttendance(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/attendance", formData);
      toast.success("Attendance marked successfully!");
      setFormData({ studentId: "", attendanceDate: "", isPresent: false });
      fetchAttendance();
    } catch (error) {
      console.error(error);
      toast.error("Error saving attendance.");
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendance);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "attendance.xlsx");
    toast.success("Excel downloaded!");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen p-6 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-wide">🎯 Attendance Tracker</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6 mb-10 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Student ID"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="date"
              name="attendanceDate"
              value={formData.attendanceDate}
              onChange={handleChange}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPresent"
                checked={formData.isPresent}
                onChange={handleChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Present?</span>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition-all"
            >
              {loading ? "Saving..." : "✅ Mark Attendance"}
            </button>
          </div>
        </form>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📄 Attendance List</h2>
            <button
              onClick={downloadExcel}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              ⬇️ Download Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Present</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-6">No records found.</td>
                  </tr>
                ) : (
                  attendance.map((record) => (
                    <tr
                      key={record._id}
                      className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2">{record.studentId}</td>
                      <td className="px-4 py-2">{new Date(record.attendanceDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{record.isPresent ? "✅" : "❌"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
