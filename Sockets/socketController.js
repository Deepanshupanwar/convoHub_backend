const onlineUsers = require("../Utills/onlineUser");

const socketController = (io, socket) => {
  const userId = socket.user.id;
  onlineUsers.set(userId, socket.id);
  console.log(onlineUsers)

  socket.on("SendChatMessage", ({ receiverId, message }) => {
    const recevierSocketId = onlineUsers.get(receiverId);
    if (recevierSocketId) {

      io.to(recevierSocketId).emit("receive-message", message)
    }
  })

  socket.on("SendGroupMessage", ({ members, message }) => {
    for (let recevier of members) {
      if (recevier._id !== socket.user.id) {
        const recevierSocketId = onlineUsers.get(recevier._id);
        if (recevierSocketId) {
          io.to(recevierSocketId).emit("receiveGroupMessage", message)
        }
      }
    }
  })

  socket.on("sendRequest", ({ receiverId, sender }) => {
    const recevierSocketId = onlineUsers.get(receiverId);
    if (recevierSocketId) {
      io.to(recevierSocketId).emit("getRequest", sender);
    }
  })

  socket.on("sendAcceptRequest", ({ senderId, chat, connection }) => {
    const senderSocketId = onlineUsers.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("getAcceptRequest", { recevierId: userId, chat, friend: connection });
    }
  })

  socket.on("sendRejectRequest", ({ senderId }) => {
    const senderSocketId = onlineUsers.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("getRejectRequest", userId);
    }
  })

  socket.on("SendGroup", ({ members, group }) => {
    for (let recevierId of members) {
      if (recevierId !== userId) {
        const recevierSocketId = onlineUsers.get(recevierId);
        if (recevierSocketId) {
          io.to(recevierSocketId).emit("receiveGroup", group)
        }
      }
    }
  })

  socket.on("addMember", ({recieverId, group})=>{
    const recevierSocketId = onlineUsers.get(recieverId);
    if(recevierSocketId){
      io.to(recevierSocketId).emit("addedToGroup", group);
    } 
  })

  socket.on("newMemberAdded",({members, group})=>{
    for (let recevier of members) {
      if (recevier._id !== userId) {
        const recevierSocketId = onlineUsers.get(recevier._id);
        if (recevierSocketId) {
          io.to(recevierSocketId).emit("receiveNewMember", group)
        }
      }
    }
  })

  socket.on("removeMember",({recieverId, groupId})=>{
    const recevierSocketId = onlineUsers.get(recieverId);
    if(recevierSocketId){
      io.to(recevierSocketId).emit("removedFromGroup",groupId);
    }
  })

  socket.on("memberRemoved",({members, groupId, memberId})=>{
    for (let recevier of members) {
      if (recevier._id !== userId) {
        const recevierSocketId = onlineUsers.get(recevier._id);
        if (recevierSocketId) {
          io.to(recevierSocketId).emit("memberRemovedFromGroup", {groupId, memberId})
        }
      }
    }
  })

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    console.log(`User disconnected: ${userId}`);
  });
};

module.exports = socketController;
