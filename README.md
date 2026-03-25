# SkillGro — React + Node.js + MongoDB

A full-stack e-learning platform with a React frontend and an Express/MongoDB backend.

## 📁 Project Structure

```
skillgro/
├── package.json          # root commands (dev, install:all)
├── README.md
├── backend/
│   ├── server.js
│   ├── seed.js
│   ├── .env.example      # copy to .env for local config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── instructorController.js
│   │   └── enrollmentController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Blog.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Event.js
│   │   ├── Instructor.js
│   │   ├── Product.js
│   │   └── User.js
│   └── routes/
│       ├── auth.js
│       ├── courses.js
│       ├── instructors.js
│       ├── events.js
│       ├── blog.js
│       ├── shop.js
│       ├── contact.js
│       └── enrollments.js
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.jsx
        ├── index.js
        ├── components/
        ├── context/
        ├── hooks/
        ├── pages/
        └── styles/
```

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- npm
- MongoDB (local or Atlas)

### 2. Install all dependencies
```bash
npm run install:all
```

### 3. Backend env setup
```bash
cp backend/.env.example backend/.env
```
Backend `.env` should include:
- `MONGO_URI` (MongoDB connection string)
- `JWT_SECRET` (token signing secret)
- `PORT` (optional, default 5000)
- `CLIENT_URL` (optional, default http://localhost:3000)

### 4. Seed database (optional)
```bash
cd backend
node seed.js
```

### 5. Run app (development)
From repo root:
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend:  http://localhost:5000

## 🛠 NPM scripts

### Root
- `npm run dev` => concurrently starts backend and frontend
- `npm run server` => `cd backend && npm run dev`
- `npm run client` => `cd frontend && npm start`
- `npm run install:all` => install dependencies everywhere

### Backend
- `npm run dev` => nodemon server.js
- `npm start` => node server.js

### Frontend
- `npm start`
- `npm run build`
- `npm test`
- `npm run eject`

## 🔌 API Endpoints

### Auth (requires JWT for protected endpoints)
- `POST /api/auth/register`  (name/password/email)
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)
- `PUT /api/auth/updateprofile` (protected)
- `PUT /api/auth/changepassword` (protected)

### Courses
- `GET /api/courses`
- `GET /api/courses/:slug`
- `POST /api/courses` (protected + role admin/instructor)
- `PUT /api/courses/:id` (protected + role admin/instructor)
- `DELETE /api/courses/:id` (protected + role admin)

### Instructors
- `GET /api/instructors`
- `GET /api/instructors/:slug`

### Events
- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events/:id/register` (protected)

### Blog
- `GET /api/blog` (query: category, search, page, limit)
- `GET /api/blog/:slug`

### Shop
- `GET /api/shop` (query: category, search, sort, page, limit)
- `GET /api/shop/:slug`

### Enrollments
- `POST /api/enrollments` (protected)
- `GET /api/enrollments/my` (protected)
- `PUT /api/enrollments/:id/progress` (protected)

### Contact
- `POST /api/contact`

### Health
- `GET /api/health`

## ⚠️ Notes
- The React frontend uses proxy `http://localhost:5000` (from `frontend/package.json`).
- Ensure backend is started before frontend for local API calls.
- For production of backend, set CORS origin and secure secrets.

## 📦 Technologies
- Frontend: React, React Router v6, Axios, CSS Modules
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- Dev: nodemon, concurrently

## 🧪 Testing
- Frontend: `cd frontend && npm test`
- Backend: add tests as needed (not included by default).

## 📄 License
MIT
