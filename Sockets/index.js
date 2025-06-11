const {Server} = require("socket.io");
const socketController = require("./socketController");
const socketAuth = require("./socketAuth");

let io;
const initSocket = (server) =>{
    io = new Server(server,{
        cors:{
            origin: "https://convo-hub-frontend-three.vercel.app",
            credentials: true
        }
    }) 
    io.use(socketAuth);
    io.on("connection",(socket)=>{
        socketController(io,socket);
    })
}

module.exports = {initSocket};