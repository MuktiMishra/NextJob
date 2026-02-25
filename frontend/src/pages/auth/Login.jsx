import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, setLoading } from "../../features/auth/authSlice";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const res = await axios.post("/user/login", form);

      if (res.data.success) {
        dispatch(loginSuccess(res.data.user));
        navigate("/register");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 text-black"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 text-black"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border p-2 text-black"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button className="w-full bg-black text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;