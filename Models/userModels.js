const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String},
    googleId: {type: String},
    profilePic: {type: String},
    connections: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: "Group"}],
    requestsReceived: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    requestsSent: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}]
    
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
    next();
})


const User = mongoose.model("user", userSchema);
module.exports = User
