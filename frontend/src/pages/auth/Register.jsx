import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useState } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePhoto: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "profilePhoto") {
      setForm({ ...form, profilePhoto: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) =>
      formData.append(key, form[key])
    );
    dispatch(registerUser(formData));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input name="fullname" placeholder="Full Name"
          onChange={handleChange}
          className="input" />

        <input name="email" placeholder="Email"
          onChange={handleChange}
          className="input mt-3" />

        <input name="phoneNumber" placeholder="Phone"
          onChange={handleChange}
          className="input mt-3" />

        <input type="password" name="password"
          placeholder="Password"
          onChange={handleChange}
          className="input mt-3" />

        <select name="role"
          onChange={handleChange}
          className="input mt-3">
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <input type="file"
          name="profilePhoto"
          onChange={handleChange}
          className="mt-3" />

        <button className="w-full bg-black text-white mt-5 py-2 rounded-lg hover:bg-gray-800">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;