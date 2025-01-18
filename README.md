# Task_App

# Taskly - SaaS Task Management System

Taskly is a SaaS-based task management system built using the MERN stack (MongoDB, Express, React, Node.js) and designed to manage tasks efficiently with features like user roles, task creation, status updates, and role-based access to an admin dashboard.

## Features

- **User Authentication & Authorization**: Admin and user roles with different dashboards.
- **Task Management**: Create, update, delete, and track tasks.
- **Task Status**: Tasks can be categorized as Pending, In Progress, or Completed.
- **Admin Dashboard**: View and manage task statistics, including completed, pending, and in-progress tasks.
- **Responsive UI**: Optimized for desktop and mobile users.

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sashanktatavolu/taskly.git
cd taskly
```

## 2. Set up Backend
Navigate to the backend folder:

cd taskly-server
Install dependencies:
```
npm install
```
Create a .env file in the root directory of the backend and add your MongoDB connection string and JWT secret:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```
nodemon server.js
```

3. Set up Frontend
Navigate to the frontend folder:
```cd  taskly-client```
Install dependencies:
```
npm install
```
Start the frontend server:
```
npm start
```

![image](https://github.com/user-attachments/assets/199874a2-acbb-4cce-9652-c631e51d13af)
