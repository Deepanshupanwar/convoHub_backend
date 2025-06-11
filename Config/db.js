const mongoose = require("mongoose");

const connectDB = async ()=>{

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

}



module.exports = connectDB;
