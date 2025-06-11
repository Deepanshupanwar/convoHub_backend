const jwt = require("jsonwebtoken");
const cookie = require("cookie")
const socketAuth = (socket, next) => {
  const cookies = socket.handshake.headers.cookie;
  if (!cookies) return next(new Error("No cookies sent"));

  const parsed = cookie.parse(cookies);
  const token = parsed.convoHub;

  if (!token) return next(new Error("No token found"));
  if (!token) return next(new Error("No token provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};

module.exports = socketAuth;
