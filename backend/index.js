import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = 3000;

app.get("/home",(req, res)=>{
    return res.status(200).json({
        message: "Welcome to the Job Portal Backend!",
        success: true
    });
})

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`); // using template literals to print the port number
});