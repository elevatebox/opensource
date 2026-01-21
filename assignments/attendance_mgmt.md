# VNR EIE Full Stack Attendance Tracking System

## Project Overview
A web-based attendance tracking system specifically designed for VNR EIE department, featuring Monday-only class attendance marking, student management, and attendance reporting capabilities.

## Technical Stack
- Frontend: HTML, CSS, JavaScript, Bootstrap
- Backend: Express.js
- Database: Any preferred database system

## Features

### 1. Header Section
- Title: "VNR EIE Full Stack Attendance"
- Current Date Display
  - Format: Day, Date (e.g., "Monday, 4 Nov 2024")
  - Auto-updates based on system date

### 2. Date Selection Panel
- Display dates in a horizontal row
- Show only Monday dates up to current date
- Format: Large date number with small month (e.g., "4 nov", "28 oct")
- Previous dates: 28 Oct, 21 Oct, 14 Oct, etc.
- Visual indicators:
  - Previous dates: Show attendance status (marked/unmarked)
  - Current date: Show marking status (pending/completed)

### 3. Student Table Interface
#### Columns:
1. Roll Number
   - All uppercase
   - Left-aligned
2. Name
   - First letter of first and last name capitalized
   - Rest in lowercase
   - Left-aligned
3. Attendance Checkbox
   - Default: Dull ash color
   - When checked: Green color
   - Centered

### 4. Student Management
#### Add Student Button
- Creates a popup modal with form fields:
  - Roll Number (required)
  - First Name (required)
  - Last Name (required)
- Submit button to add student
- Cancel button to close modal

### 5. Attendance Report Section
- Displays after marking attendance
- Shows:
  - Total number of students
  - Present count
  - Absent count
- Download CSV option
  - Filename format: `attendance_YYYY_MM_DD.csv`
  - CSV format:
    ```
    Roll Number, Name, Attendance
    ABC123, John Doe, 1
    XYZ789, Jane Smith, 0
    ```

## API Endpoints

### 1. GET /students
- Retrieves all students
- Response format:
```json
{
  "students": [
    {
      "rollNumber": "ABC123",
      "firstName": "John",
      "lastName": "Doe"
    }
  ]
}
```

### 2. POST /students
- Creates new student
- Request body:
```json
{
  "rollNumber": "ABC123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### 3. POST /attendance
- Marks attendance for a specific date
- Request body:
```json
{
  "date": "2024-11-04",
  "attendance": [
    {
      "rollNumber": "ABC123",
      "present": true
    }
  ]
}
```

### 4. GET /attendance/:date
- Retrieves attendance for specific date
- Response format:
```json
{
  "date": "2024-11-04",
  "attendance": [
    {
      "rollNumber": "ABC123",
      "name": "John Doe",
      "present": true
    }
  ],
  "summary": {
    "total": 30,
    "present": 25,
    "absent": 5
  }
}
```

## Sample UI

<img width="899" alt="image" src="https://github.com/user-attachments/assets/67c5a9b8-3602-43be-95bc-f8279296546c">



## Frontend Implementation Details

### HTML Structure
```html
<!DOCTYPE html>
<html>
<head>
    <title>VNR EIE Attendance</title>
    <link href="bootstrap.min.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <header>
        <h1>VNR EIE Full Stack Attendance</h1>
        <div id="currentDate"></div>
    </header>

    <!-- Date Selection -->
    <div id="dateSelector"></div>

    <!-- Student Table -->
    <table id="studentTable">
        <thead>
            <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Attendance</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <!-- Add Student Button -->
    <button id="addStudent">Create Student</button>

    <!-- Report Section -->
    <div id="attendanceReport"></div>
</body>
</html>
```

### CSS Requirements
- Responsive design using Bootstrap grid system
- Custom styles for:
  - Date selector (highlighted current date)
  - Checkbox styling (ash to green transition)
  - Table layout and responsiveness
  - Modal styling
  - Report section layout

### JavaScript Functions Required
1. `initializePage()`
   - Load current date
   - Generate date selector
   - Fetch and display student list

2. `generateDateSelector()`
   - Calculate previous Mondays
   - Create date selection interface

3. `loadStudents()`
   - Fetch students from API
   - Populate table

4. `handleAttendanceToggle()`
   - Handle checkbox state changes
   - Update UI

5. `handleStudentCreation()`
   - Show modal
   - Handle form submission
   - Update table

6. `generateReport()`
   - Calculate attendance statistics
   - Display summary
   - Enable CSV download

7. `downloadCSV()`
   - Generate CSV content
   - Create download link
   - Trigger download

## Data Storage Schema

### Students Collection
```json
{
  "rollNumber": "String (Primary Key)",
  "firstName": "String",
  "lastName": "String",
  "createdAt": "DateTime"
}
```

### Attendance Collection
```json
{
  "date": "Date",
  "rollNumber": "String (Foreign Key)",
  "present": "Boolean",
  "markedAt": "DateTime"
}
```

## Error Handling
- Form validation for student creation
- API error responses
- Date selection validation
- Duplicate roll number prevention
- Network error handling
- Session management

## Security Considerations
- Input sanitization
- CSRF protection
- Rate limiting
- Data validation
- Error logging

## Future Enhancements
- Multi-class support
- Attendance statistics visualization
- Export to PDF
- Email notifications
- Bulk student import



