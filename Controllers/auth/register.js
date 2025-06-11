const User = require("../../Models/userModels");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const userExist = await User.findOne({email}).populate("requestsReceived","name email").populate("connections","name email profilePic");
        if(userExist) return res.status(400).json({message: "User already exists"});
        const newUser = await User.create({name,email,password});
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn: "7d"});
        res.status(201).cookie("convoHub", token, { maxAge: 60 * 60 * 24 * 1000 * 7 }).json(newUser);
    }
    catch(e){
        res.status(500).json(e);
    }

}