import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Job Portal
      </h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">
          {user?.fullname}
        </span>

        <span className="px-3 py-1 bg-black text-white text-sm rounded-full">
          {user?.role}
        </span>

        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;