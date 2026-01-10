# 📝 Personal Task Tracker API (FastAPI)

A simple **FastAPI-based Task Tracker** that allows users to create, view, complete, and delete tasks.  
This project is designed for **learning FastAPI, SQLAlchemy, and basic CRUD operations**.

---

## 🚀 Features

- Create a task
- View all tasks
- Mark a task as completed
- Delete a task
- SQLite database (easy setup)
- Clean and simple API design

> ⚠️ Authentication is mocked using a **fake user ID** to keep the app simple.

---

## 🧱 Tech Stack

- **FastAPI**
- **SQLAlchemy**
- **SQLite**
- **Uvicorn**

---

## 📁 Project Structure

app/
├── main.py # FastAPI routes
├── database.py # Database connection
├── models.py # SQLAlchemy models
├── schemas.py # Pydantic schemas



---

## ⚙️ Installation

### 1️⃣ Create a virtual environment (optional)
```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows


2️⃣ Install dependencies
pip install fastapi uvicorn sqlalchemy

▶️ Run the Application
uvicorn main:app --reload


API: http://127.0.0.1:8000

Swagger Docs: http://127.0.0.1:8000/docs