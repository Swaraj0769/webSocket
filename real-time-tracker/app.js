const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const cors = require('cors');

const app = express();
app.use(cors()); // allow frontend from other origins

const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" }
});

app.set('view engine', "ejs");
// Serve static files from the 'public' directory
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Or if your CSS is in a 'static' folder:
app.use(express.static('public'));

io.on('connection', function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    })
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
})

app.get('/', function(req, res){
    res.render("index")
})

server.listen(3000)

