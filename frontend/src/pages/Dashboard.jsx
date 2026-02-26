import { useSelector } from "react-redux";
import StudentDashboard from "./student/StudentDashboard";
import RecruiterDashboard from "./recruiter/RecruiterDashboard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {user?.role === "student" && <StudentDashboard />}
      {user?.role === "recruiter" && <RecruiterDashboard />}
    </div>
  );
};

export default Dashboard;