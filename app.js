const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const WebSocket = require('ws');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//Websocker server
const wss = new WebSocket.Server({ server:server });
var clients = [];

//establishing WebSocket connecion 
wss.on('connection', function connection(ws){
    clients.push(ws);
    console.log(`A new Client Connected. Total Connected Clients = ${clients.length}`)
    ws.on('close', ()=> {
        clients.pop(ws);
        if(clients.length==0){
            console.log("No Clients are connected!!");
            return true;    
        }
        console.log(`A Client Got Dis-connected. Total Connected Clients ${clients.length}`);
        
    });
});

//sending random number to connected clients
let interval = setInterval(() => {
    var rand=Math.floor((Math.random() * 898500) + 123200);;
    wss.clients.forEach(function (client) {
        client.send(rand);
        console.log(`Generated Random Number is ${rand}`);
    });
    
    

}, 3000);

//serving static index file
app.use(express.static(path.join(__dirname, 'public/')));

//server listening
server.listen(PORT, ()=>{
    console.log("Server Started On Port 3000");
});
