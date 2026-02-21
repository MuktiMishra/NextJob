export const register =async(req, res)=>{
    try{
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password|| !role){
            res.status(400).json({
                message: "All fields are required",
                success: false
            })
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: newUser
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const login = async(req, res)=>{
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        };
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found with this email",
                success: false
            });
        }
        const isPasswordMatch = await bcrypt.compare(password , user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            })
        }

        if(user.role !== role){
            res.status(400).json({
                message: `User is not registered as ${role}`,
                success: false
            })
        }
        const tokenData = {
            userId: user._id

        }


        // now everything is ok , now we can generate jwt token
        const token = jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn: '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        res.status(200).cookie("token", token , { maxAge: 1*24*60*60*1000, httpOnly: true , sameSite:'strict'}).json({
            message: `Welcome back ! ${user.fullname}`,
            success: true,
            user
        });
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const logout = async(req, res)=>{
    try{
        res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            });
        }

        //cloudinary se resume upload krne ke baad uska url mil jayega , usko bhi yaha save krna hai user ke profile me

        const skillsArray =  skills.split(",");
        const userId = req.id; // middleware se id milta hai
        let user = await user.findById(userId);
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
// updating data
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;
       // resume updation we'll add later - jab ham cloudinary add krenge

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        });        
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}