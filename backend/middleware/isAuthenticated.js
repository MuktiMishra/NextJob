import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

const isAuthenticated = async (req, res, next)=>{
    try{
        const token = req.cookies.token;
        console.log(req.cookies)
        if(!token){
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }
        const decode = jwt.verify(token , process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        const user = await User.findOne({
            _id: decode.userId
        }) 

        const path = req.baseUrl + req.path; 
        console.log(path)

        if (path === "/api/v1/user/validate") {
            return res.status(200).json({message: "user verified", data: user});
        }

        req.id = decode.userId;
        next();

    }
    catch(error){
        console.log('error', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export default isAuthenticated;
//comment

