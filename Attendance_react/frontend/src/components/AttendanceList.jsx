import { useEffect, useState } from 'react';
import { getAttendance, deleteAttendance } from '../services/attendanceService';
import * as XLSX from 'xlsx';

function AttendanceList({ refreshFlag }) {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    fetchData();
  }, [refreshFlag]);

  const fetchData = async () => {
    const { data } = await getAttendance();
    setAttendances(data);
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

  return (
    <div>
      <button onClick={downloadExcel}>Download as Excel</button>
      <ul>
        {attendances.map((att) => (
          <li key={att._id}>
            {att.studentId} - {att.attendanceDate.split('T')[0]} - {att.isPresent ? "Present" : "Absent"}
            <button onClick={() => handleDelete(att._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceList;
