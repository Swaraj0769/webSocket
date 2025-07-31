const express = require('express')
const { WebSocketServer } = require('ws')

const app = express()
const port = 8080


const server = app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})

const wss = new WebSocketServer({server});

wss.on("connection", (ws)=>{   //connection is an event
    ws.on("message", (data)=>{
        console.log("data from client:", data);
        // console.log("data from client %s:", data);      //it is use for taking data in the form of string
        ws.send("ha kar le websocket use")
    })
})