const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom}=require('./user.js');
const PORT=process.env.PORT|| 5000;

const router=require('./router');
const { mainModule } = require('process');
const app=express();    
const server=http.createServer(app);
const io=socketio(server,{
    cors: { origin: "*", methods: ["GET", "POST"] }});
app.use(router);
app.use(cors());

io.on('connection',(socket)=>{

    socket.on('join',({name,room},callback)=>{
        // console.log(socket.id);
        const {error,user}=addUser({id:socket.id,name,room});
        if(error){
            callback(error);
        }
        else{
            socket.join(user.room);
            socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room}`});
            socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
        callback();
    })
    socket.on('sendMessage',(message,callback)=>{
        const user=getUser(socket.id);
        // console.log(socket.id,user);
        io.to(user.room).emit('message',{user:user.name, text:message});
        callback();
    });
    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
    
});
server.listen(PORT,()=>console.log(`Server is started on port ${PORT}`));