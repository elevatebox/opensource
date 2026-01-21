# VNR Student Registration and Todo System

A Flask-based REST API system that handles student registration for VNR VJIET and includes a todo list management system.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Documentation](#api-documentation)
  - [Student Registration](#student-registration)
  - [Todo List Management](#todo-list-management)
- [Data Storage](#data-storage)
- [Validation Rules](#validation-rules)

## Features

- Student registration with email validation
- Todo list creation and management
- Data persistence using CSV and JSON
- Input validation and error handling
- RESTful API endpoints

## Prerequisites

- Python 3.7+
- Flask
- CSV and JSON support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vnr-registration-system.git
cd vnr-registration-system
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install flask
```

4. Run the application:
```bash
python app.py
```

## API Documentation

### Student Registration

#### Register a New Student
- **Endpoint**: `POST /register`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
    "name": "John Doe",
    "email": "john@vnrvjiet.in",
    "phone": "1234567890",
    "year": 2
}
```
- **Response (Success)**:
```json
{
    "message": "Student registered successfully",
    "status": "success"
}
```
- **Response (Error)**:
```json
{
    "error": "Invalid email format. Must be xxxxx@vnrvjiet.in"
}
```

### Todo List Management

#### Create Todo
- **Endpoint**: `POST /todo_create`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
    "task": "Complete assignment",
    "status": false
}
```
- **Response (Success)**:
```json
{
    "message": "Todo created successfully",
    "todo_id": 1
}
```

#### Get All Todos
- **Endpoint**: `GET /todos`
- **Response**:
```json
{
    "todos": [
        {
            "id": 1,
            "task": "Complete assignment",
            "status": false
        }
    ]
}
```

#### Update Todo
- **Endpoint**: `PUT /todo_update/<todo_id>`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
    "task": "Updated task",
    "status": true
}
```

#### Delete Todo
- **Endpoint**: `DELETE /todo_delete/<todo_id>`

## Data Storage

### Student Data (vnr_students.csv)
- Student information is stored in CSV format
- Fields: name, email, phone, year, registration_date

### Todo Data (todos.json)
- Todo items are stored in JSON format
- Each todo has: id, task, status

## Validation Rules

### Student Registration
- Email must be in format: xxxxx@vnrvjiet.in
- Phone number must be 10 digits
- Year must be between 1 and 4

### Todo Items
- Task description cannot be empty
- Status must be boolean (true/false)

## Important Notes

1. **Submission Deadline**: March 31st, 11:59 PM
2. **Data Persistence**: All data is stored locally in CSV and JSON files
3. **Error Handling**: The API returns appropriate error messages with corresponding HTTP status codes

## Error Codes

- 400: Bad Request (Invalid input)
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

