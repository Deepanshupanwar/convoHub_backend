const {Server} = require("socket.io");
const socketController = require("./socketController");
const socketAuth = require("./socketAuth");

let io;
const initSocket = (server) =>{
    io = new Server(server,{
        cors:{
            origin: "http://localhost:5173",
            credentials: true
        }
    }) 
    io.use(socketAuth);
    io.on("connection",(socket)=>{
        socketController(io,socket);
    })
}

module.exports = {initSocket};