import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PostJob from "./pages/recruiter/PostJob.jsx"; 
import UpdateProfile from "./pages/student/UpdateProfile.jsx";
import LandingPage from "./components/LandingPage.jsx";
import DetailedJob from "./pages/job/DetailedJob.jsx"
import Application from './pages/apply/Application.jsx'
import MyJobs from './pages/job/MyJobs.jsx'
import ReviewJob from './pages/recruiter/ReviewJob.jsx'
import SearchJob from './pages/job/SearchJob.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/profile" element={<UpdateProfile />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route 
            path="/postjob"
            element={
                <ProtectedRoute>
                    <PostJob /> 
                </ProtectedRoute>
            }
        />
        <Route 
            path="/job/:jobid"
            element={
                <ProtectedRoute>
                    <DetailedJob /> 
                </ProtectedRoute>
            }
        />
         <Route 
            path="/apply/:jobid"
            element={
                <ProtectedRoute>
                    <Application /> 
                </ProtectedRoute>
            }
        />
        <Route 
            path="/job/myjobs"
            element={
                <ProtectedRoute>
                    <MyJobs /> 
                </ProtectedRoute>
            }
        />
        <Route 
            path="/reviewjob/:jobid"
            element={
                <ProtectedRoute>
                    <ReviewJob /> 
                </ProtectedRoute>
            }
        />
        <Route 
            path="/search"
            element={
                <ProtectedRoute>
                    <SearchJob /> 
                </ProtectedRoute>
            }
        />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
