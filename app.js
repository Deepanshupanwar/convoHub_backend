const express = require("express");
const authRoutes = require("./Routes/authRoutes");
const connectRoutes = require("./Routes/connectRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const groupChatRoutes = require("./Routes/groupChatRoutes");
const connectDB = require("./Config/db");
const cookieParser = require("cookie-parser");
require("./Config/passport"); 
const passport = require("passport");
const {Verify} = require("./Middlewares/verfiy");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const profileRoutes = require("./Routes/profileRoutes");



const app = express();
app.use(cors({
    origin: "https://convo-hub-frontend-three.vercel.app",
    credentials: true,
  }));
app.use(express.json());

app.use(cookieParser());

connectDB();

app.use(passport.initialize());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));


app.get('/',(req,res)=>{
    res.send("hello world");
})

app.use("/api/auth",authRoutes);
app.use("/api/connect",Verify,connectRoutes);
app.use('/api/chat',Verify,chatRoutes);
app.use('/api/groupChat',Verify,groupChatRoutes);
app.use('/api/profile',Verify, profileRoutes)



module.exports = app;