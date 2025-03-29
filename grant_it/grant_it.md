# grant.it - School/College Permission Management System

We are building a web application using **HTML**, **CSS**, **JavaScript**, or **Bootstrap**. The project is a **School/College Permission Management System**, where we will have the following roles:

- **Admin (Principal/Developer Endpoint)** 
- **Co-admin (HODs/Permission Granters for Gatepass/Outpass)**
- **Students/End-users (Requesting permission)**

Our application is named **grant.it**.

## Requirements

### 1. **Main Page UI**

- [ ] At the top of the page, display the application name **grant.it** in **bold** and **green** color.
- [ ] Create a **Login Box** with a user-friendly interface containing:
  - **Two input fields**: 
    1. Username
    2. Password
  - A **Dropdown** at the top asking to **login as**:
    1. Admin
    2. Co-admin
    3. Student
- [ ] **Role-based access control** (RBAC) will be implemented to ensure proper access for each type of user:
  - **Admin** can create more co-admins.
  - **Co-admins** can create more students/users.

### 2. **Admin Role**

When an admin logs in, the interface should have:
- A **tabbed view** with two tabs:
  1. **Co-admin Management Tab**:
     - Admin can manage all co-admins and assign branches to them.
     - CRUD operations for managing co-admins.
  2. **Student Management Tab**:
     - Admin can view and manage all students.
     - CRUD operations for managing students.
     
### 3. **Co-admin Role (HOD)**

When a co-admin logs in, the interface should display:
- **Assigned Branch Information** at the top.
- A **tabbed view** with two tabs:
  1. **Student Management Tab**:
     - CRUD operations for students under the co-admin.
  2. **Requests Tab**:
     - View all student requests.
     - Co-admin can **Approve/Reject** requests.
     - **Cool animation** should appear when a new request pops up.
  
### 4. **Student Role**

When a student logs in, the interface should display:
- A **tabbed view** with two tabs:
  1. **Request Permission Tab**:
     - A **horizontal bar** for the subject line and a **4-line text box** for permission details.
     - Buttons for:
       - **Send** (showing a pop-up: "Request sent successfully")
       - **Cancel** (showing a pop-up: "Cancelled")
  2. **Request History Tab**:
     - Displays past requests with a **progress bar** indicating whether the request is **Approved/Rejected**.
     - No delete option for students.

## Technical Requirements

- The frontend will be built using **HTML**, **CSS**, **JavaScript**, and **Bootstrap**.
- Use **JSON** files to store data for now (Admin, Co-admin, Student information, and some sample requests).
- **Folder Structure**:
  - `/css` - CSS files
  - `/js` - JavaScript files
  - `/html` - HTML files
  - `/data` - JSON data files
- We will later implement APIs and integrate with **MongoDB** using **Express.js**.

---

For now, please ensure that:
- [ ] **Admin** can manage co-admins and students.
- [ ] **Co-admins** can manage students and handle requests.
- [ ] **Students** can request permissions and view the request status.

Later, we will replace the dummy data with a full **MongoDB** backend and integrate it with **Express.js** for API management.