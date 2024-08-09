const asyncHandler = require("express-async-handler"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 
const User = require("../models/userModel");

//@desc Register the user
//@route POST /api/users/register
//@access public 

const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body; 
    if(!username || !email || !password){
        res.status(400); 
        throw new Error("All fields are mandatory"); 
    }
    //Check whether a user already exists
    const userAvaialble = await User.findOne({email});
    if(userAvaialble) {
        res.status(400); 
        throw new Error("User already exists"); 
    }
    //Create hash password, await will be used since bcrypt will give promise
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password: ", hashedPassword);

    const user = await User.create({
        username, email, password:hashedPassword,
    });

    console.log(`User created ${user}`);

    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc Login the user
//@route POST /api/users/login
//@access public 

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body; 
    if(!email || !password){
        res.status(400); 
        throw new Error("All fields are mandatory"); 
    }
    const user = await User.findOne({email}); 
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username, 
                email: user.email, 
                _id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401); 
        throw new Error("Invalid Credentials");
    }
});

//@desc Current user info
//@route POST /api/users/current
//@access private (only logged in user can get the current user info) 

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports= {registerUser, loginUser, currentUser};