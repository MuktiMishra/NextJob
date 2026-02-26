const RecruiterDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">💼 Recruiter Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Posted Jobs</h2>
          <p className="text-2xl mt-2">8</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Applications</h2>
          <p className="text-2xl mt-2">34</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold">Active Listings</h2>
          <p className="text-2xl mt-2">6</p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;