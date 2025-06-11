const jwt = require("jsonwebtoken");
const User = require("../../Models/userModels");
const bcrypt = require("bcryptjs");

exports.login = async (req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email}).populate("requestsReceived","name email").populate("connections","name email profilePic");
        if(!user) return res.status(404).json({message: "user not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message: "invalid credentials"});

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: "7d"});
        res.status(201).cookie("convoHub", token, { maxAge: 60 * 60 * 24 * 1000 * 7 }).json(user);
    }
    catch(e){
        res.status(500).json({message: "server error"})
    }
    
}