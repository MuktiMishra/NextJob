import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast";

const API = "http://localhost:8000/api/v1/user";

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/login`, formData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await axios.get(`${API}/logout`, { withCredentials: true });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
 extraReducers: (builder) => {
  builder
    // REGISTER
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
    })

    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;

      toast.custom((t) => (
        <CustomToast
          t={t}
          type="success"
          message={action.payload.message || "Registered Successfully"}
        />
      ));
    })

    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;

      toast.custom((t) => (
        <CustomToast
          t={t}
          type="error"
          message={action.payload?.message || "Registration Failed"}
        />
      ));
    })

    // LOGIN
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })

    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;

      toast.custom((t) => (
        <CustomToast
          t={t}
          type="success"
          message={action.payload.message || "Login Successful"}
        />
      ));
    })

    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;

      toast.custom((t) => (
        <CustomToast
          t={t}
          type="error"
          message={action.payload?.message || "Invalid Credentials"}
        />
      ));
    })

    // LOGOUT
    .addCase(logoutUser.fulfilled, (state) => {
      state.user = null;

      toast.custom((t) => (
        <CustomToast
          t={t}
          type="success"
          message="Logged out successfully"
        />
      ));
    });
  }
});

export default authSlice.reducer;