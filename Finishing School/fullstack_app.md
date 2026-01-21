# Full-Stack Development Projects for College Students

These projects are designed to help college students learn full-stack development using **HTML, CSS, JavaScript**, and **Node.js**. Each project should be uploaded to GitHub with proper documentation and setup instructions.

---

## Date: 3rd January

### Solve the issue in the attendance app: [Attendance App GitHub Link](https://github.com/elevatebox/opensource/tree/main/attendance_app)

---

## 1. Assignment Tracker

### Frontend Components
- Responsive UI built with HTML, CSS, and JavaScript
- Features:
  - Assignment management (add, view, edit, delete)
  - Interactive date picker for deadlines
  - Color-coded calendar visualization

### Backend Implementation
- Node.js RESTful APIs for CRUD operations
- Data Structure (`database.json`):
```json
{
  "assignments": [
    {
      "id": "unique-id",
      "title": "string",
      "description": "string",
      "deadline": "date",
      "status": "string"
    }
  ]
}
```

### Key Features
- CORS implementation for frontend-backend communication
- Static file serving through Node.js
- Error handling and input validation

## 2. College Event Portal

### Frontend Components
- Event listing and detail views
- Registration form interface
- Personal dashboard for registered events

### Backend Implementation
- Node.js APIs for event management and registrations
- Data Structure (`database.json`):
```json
{
  "events": [
    {
      "id": "unique-id",
      "name": "string",
      "date": "date",
      "location": "string",
      "description": "string"
    }
  ],
  "registrations": [
    {
      "eventId": "string",
      "studentName": "string",
      "studentEmail": "string"
    }
  ]
}
```

### Key Features
- Secure CORS configuration
- Frontend and backend form validation
- Response status handling

## 3. Study Buddy Finder

### Frontend Components
- Profile creation and editing interface
- Search functionality by courses/interests
- Matched profiles display

### Backend Implementation
- User profile and search APIs
- Data Structure (`database.json`):
```json
{
  "profiles": [
    {
      "id": "unique-id",
      "name": "string",
      "email": "string",
      "courses": ["array"],
      "interests": ["array"]
    }
  ]
}
```

### Key Features
- Basic authentication system
- CORS security implementation
- Profile data validation

## 4. Expense Splitter

### Frontend Components
- Group creation and management interface
- Expense entry and splitting functionality
- Balance dashboard

### Backend Implementation
- Group and expense management APIs
- Data Structure (`database.json`):
```json
{
  "groups": [
    {
      "id": "unique-id",
      "name": "string",
      "members": ["array"]
    }
  ],
  "expenses": [
    {
      "groupId": "string",
      "description": "string",
      "amount": "number",
      "paidBy": "string"
    }
  ]
}
```

### Key Features
- Expense calculation logic
- CORS configuration
- Data validation and error handling

## GitHub Submission Requirements

1. **Repository Structure**
   - Separate folders for frontend and backend
   - Clear README.md with setup instructions
   - .gitignore file for node_modules and environment files
