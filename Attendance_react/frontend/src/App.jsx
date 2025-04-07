import { useState } from 'react';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import './theme.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshData = () => setRefresh(!refresh);

  return (
    <div className="App">
      <h1>Attendance Management</h1>
      <ThemeToggle />
      <AttendanceForm refreshData={refreshData} />
      <AttendanceList refreshFlag={refresh} />
    </div>
  );
}

export default App;
