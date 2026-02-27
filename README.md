# NextJob – MERN Job Portal

NextJob is a full-stack **MERN-based job portal** that connects **job seekers** and **recruiters** through a secure and streamlined platform.

Users can create professional profiles, browse and apply for jobs, while recruiters can post job openings and manage applications efficiently. The platform ensures secure authentication, role-based access control, and a responsive user interface for seamless access.

---

# Features

## Job Seeker Features
- User Registration & Login
- JWT-based Authentication
- Create & Update Profile (skills, education, experience, resume)
- Browse & Search Jobs (by keyword, company, role)
- Apply for Jobs
- Track Application Status (Pending / Accepted / Rejected)

## Recruiter Features
- Recruiter Registration & Login
- Post New Job Openings
- Edit / Delete Job Posts (CRUD Operations)
- View Applicants for Posted Jobs
- Update Application Status

## Security & Access Control
- JWT Authentication
- Role-Based Access Control (RBAC)
- Protected Routes
- Secure REST APIs
- Password Hashing using bcrypt

## UI/UX
- Fully Responsive Design
- Separate Dashboards for Users & Recruiters
- Clean and Modern Interface
- Real-time Status Indicators

---

# Tech Stack

## Frontend
- React.js
- Redux Toolkit (State Management)
- React Router DOM
- Axios
- Tailwind CSS / Chakra UI

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt

---

# Architecture

Client (React Frontend)  
⬇  
REST API (Express Backend)  
⬇  
MongoDB Database  

- Authentication handled via JWT
- Middleware for route protection
- RBAC for User and Recruiter roles

---
