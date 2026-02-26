const StudentDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">🎓 Student Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Applied Jobs</h2>
          <p className="text-2xl mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Saved Jobs</h2>
          <p className="text-2xl mt-2">5</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Profile Status</h2>
          <p className="text-green-600 mt-2">Complete</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;