import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PostJob from "./pages/recruiter/PostJob.jsx"; 
import UpdateProfile from "./pages/student/UpdateProfile.jsx";
import LandingPage from "./components/LandingPage.jsx";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
