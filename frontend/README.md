# NextJob Frontend

React + Vite frontend for the NextJob MERN job portal.

## Tech Stack
- **React 18** + **Vite**
- **Redux Toolkit** — global state (auth, jobs, companies, applications)
- **React Router v6** — client-side routing + protected routes
- **Tailwind CSS** — styling with custom dark theme
- **Axios** — HTTP calls to Express backend
- **react-hot-toast** — notifications
- **lucide-react** — icons

---

## Setup

```bash
cd nextjob-frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`
Backend must run at: `http://localhost:8000`

---

## Project Structure

```
src/
├── api/
│   └── index.js          # All axios calls mapped to backend routes
├── store/
│   ├── store.js           # Redux store
│   └── slices/
│       ├── authSlice.js
│       ├── jobSlice.js
│       ├── companySlice.js
│       └── applicationSlice.js
├── components/
│   └── shared/
│       ├── Navbar.jsx          # Adaptive navbar (guest/student/recruiter)
│       ├── ProtectedRoute.jsx  # Route guards
│       ├── JobCard.jsx         # Reusable job card
│       └── UI.jsx              # Spinner, PageLoader, EmptyState
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Profile.jsx         # Shared profile page (edit)
│   ├── auth/
│   │   ├── Login.jsx       # Role-aware login
│   │   └── Register.jsx    # Register with photo upload
│   ├── student/
│   │   ├── Jobs.jsx        # Browse + search + filter jobs
│   │   ├── JobDetail.jsx   # Job details + apply button
│   │   └── AppliedJobs.jsx # Track applications & status
│   └── recruiter/
│       ├── RecruiterJobs.jsx  # Posted jobs + post new job modal
│       ├── Applicants.jsx     # View applicants + update status
│       ├── Companies.jsx      # List companies + register new
│       └── EditCompany.jsx    # Update company info/logo
└── App.jsx                # Router with all routes
```

---

## API Mapping

| Frontend action | Backend route |
|---|---|
| Register | `POST /api/v1/user/register` |
| Login | `POST /api/v1/user/login` |
| Logout | `GET /api/v1/user/logout` |
| Update Profile | `POST /api/v1/user/profile/update` |
| Browse Jobs | `GET /api/v1/job/get?keyword=` |
| Get Job by ID | `GET /api/v1/job/get/:id` |
| Post Job | `POST /api/v1/job/post` |
| Get Admin Jobs | `POST /api/v1/job/getadminjobs` |
| Register Company | `POST /api/v1/company/register` |
| Get My Companies | `GET /api/v1/company/get` |
| Get Company by ID | `GET /api/v1/company/get/:id` |
| Update Company | `PUT /api/v1/company/update/:id` |
| Apply for Job | `GET /api/v1/application/apply/:id` |
| Get Applied Jobs | `GET /api/v1/application/get` |
| Get Applicants | `GET /api/v1/application/:id/applicants` |
| Update App Status | `POST /api/v1/application/status/:id/update` |

---

## Notes

1. **Auth** uses JWT stored in an httpOnly cookie — `withCredentials: true` is set on all axios requests.
2. User object is also persisted in `localStorage` as `nj_user` for page refresh.
3. Routes are protected by role: students can't access recruiter pages and vice versa.
4. File uploads use `multipart/form-data` — register sends profile photo, update profile sends resume.
5. The backend CORS is configured for `http://localhost:5173` — don't change the frontend port or update CORS in backend.
