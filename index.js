const express=require("express");
const app=express();
const http=require("http").createServer(app)

const port=3000;

http.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})


app.use(express.static(__dirname+"/public"))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


const io=require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log("connected...");
    socket.on('message',(msg)=>{
        // console.log(msg);
        socket.broadcast.emit('message',msg)
    })
})