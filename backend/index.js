import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoutes from './routes/job.route.js';
import applicationRoutes from './routes/application.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/* -------------------- CORS FIRST -------------------- */
const corsOptions = {
    origin: "https://next-job-cvah-q7ywznk27-factduniyah-6903s-projects.vercel.app",
    credentials: true,
};

app.use(cors(corsOptions));

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* -------------------- ROUTES -------------------- */
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "Welcome to the Job Portal Backend!",
        success: true
    });
});

/* -------------------- SERVER START -------------------- */
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
