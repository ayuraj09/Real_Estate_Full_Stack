//     import {Server} from 'socket.io'

//     const env = 'dev';

//     // Set origin based on environment
//     const origin = env === 'dev' 
//     ? 'http://localhost:5173' 
//     : 'https://realestatefrontend-nu.vercel.app';
    
//     const io = new Server({
//         cors: {
//             origin: 'http://localhost:5173' , 
//         },
//     });

//     console.log(origin);
    

//     let onlineUser = []

//     const addUser = (userId, socketId) => {
//         const userExist = onlineUser.find((user) => user.userId === userId);
//         if(!userExist){
//             onlineUser.push({userId,socketId})
//         }
//     }
//     const getUser = (userId) => {
//         return onlineUser.find(user=>user.userId===userId)
//     }
//     const removeUser = (socketId) => {
//         onlineUser = onlineUser.filter((user) => user.socketId !== socketId); 
//     }

    
//     io.on("connection", (socket) => {
//         socket.on("newUser",(userId)=>{
//             addUser(userId,socket.id)        
//     });

//     socket.on("sendMessage", ({recieverId,data})=>{
//         const reciever= getUser(recieverId)
//         io.to(reciever.socketId).emit("getMessage",data); 
        
//     })

//     socket.on("disconnect", ()=> {
//         removeUser(socket.id);
//     })
//  });
// // const PORT = process.env.PORT || 4000; 
// io.listen("http://localhost:4000", () => {
//     console.log(`Server is running on port ${PORT}`);
// });



import { Server } from 'socket.io';
import http from 'http';

const env = 'prod';

// Create an HTTP server
const server = http.createServer();

// Attach Socket.IO to the server
const io = new Server(server, {
  cors: {
    origin: env === "devel"
    ? "http://localhost:5173"
    : "https://realestatefrontend-nu.vercel.app",
  },
});

let onlineUsers = [];

// Add a user to the online users list
const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
  }
};

// Get a user by their userId
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

// Remove a user from the online users list by socketId
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Add new user
  socket.on('newUser', (userId) => {
    addUser(userId, socket.id);
    console.log('User added:', { userId, socketId: socket.id });
  });

  // Handle sending messages
  socket.on('sendMessage', ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit('getMessage', data);
      console.log(`Message sent to ${receiverId}:`, data);
    } else {
      console.log(`User with ID ${receiverId} not found.`);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    removeUser(socket.id);
  });
});

// Start the server
server.listen(process.env.PORT)
