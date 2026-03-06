// const StudentDashboard = () => {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">🎓 Student Dashboard</h1>

//       <div className="grid grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold">Applied Jobs</h2>
//           <p className="text-2xl mt-2">12</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold">Saved Jobs</h2>
//           <p className="text-2xl mt-2">5</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="font-semibold">Profile Status</h2>
//           <p className="text-green-600 mt-2">Complete</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Eye, Send } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'

const stats = [
  { id: 1, title: "Total Applied", value: 24, icon: Send },
  { id: 2, title: "Pending Review", value: 8, icon: Clock },
  { id: 3, title: "Interviews", value: 3, icon: CheckCircle },
  { id: 4, title: "Profile Views", value: 142, icon: Eye },
];

const mockApplications = [
  {
    company: "Spotify",
    role: "Senior UX Designer",
    date: "Oct 24, 2023",
    status: "In Review",
  },
  {
    company: "Airbnb",
    role: "Product Designer",
    date: "Oct 22, 2023",
    status: "Interview",
  },
  {
    company: "Netflix",
    role: "UI Engineer",
    date: "Oct 20, 2023",
    status: "Rejected",
  },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [applications, setApplications] = React.useState([])

    React.useEffect(() => {
        const getData = async () => {
            const res = await axios.get('http://localhost:8000/api/v1/user/getdashboarddata', {withCredentials: true}); 
            console.log("res", res)
            if (res.status === 201 || res.status === 200) setApplications(res.data.data)
        }

        getData(); 
    }, [])

  const sidebarItems = [
    { label: "Dashboard", path: "/student/dashboard" },
    { label: "My Applications", path: "/job/myjobs" },
    { label: "Search", path: "/search" },
    { label: "My Profile", path: "/student/profile" },
    { label: "Settings", path: "/student/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="grid grid-cols-12 gap-6">

        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">Alex Morgan</h2>
              <p className="text-sm text-gray-700">Product Designer</p>
            </div>

            <div className="w-full">
              <p className="text-xs text-gray-700 mb-1">
                Profile Completion: 75%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-black h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="mt-8 space-y-3">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm transition ${
                  location.pathname === item.path
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => navigate("/login")}
              className="w-full text-left px-4 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 space-y-6">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Overview</h1>
              <p className="text-gray-700">
                Welcome back, Alex! Here's what's happening with your job search.
              </p>
            </div>
            <button
              onClick={() => navigate("/student/profile")}
              className="bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 transition"
            >
              Update Profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white rounded-2xl shadow p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-700">{stat.title}</p>
                </div>
                <stat.icon className="h-8 w-8 text-gray-700" />
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
              <button
                onClick={() => navigate("/job/myJobs")}
                className="text-sm text-black hover:underline"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-700 border-b">
                    <th className="py-3">Company</th>
                    <th>Role</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={index} className="border-b last:border-none">
                      <td className="py-4 font-medium">{app.job.company.name}</td>
                      <td>{app.job.position}</td>
                      <td>{app.createdAt.split('T')[0]}</td>
                      <td>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            app.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : app.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="text-right">•••</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
