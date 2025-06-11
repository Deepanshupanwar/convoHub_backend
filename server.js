require("dotenv").config();
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const {initSocket} = require("./Sockets");

initSocket(server)

const port = process.env.PORT;
server.listen(port, ()=>{
    console.log("server is listening to port: "+ port)
})