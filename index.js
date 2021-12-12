const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb+srv://@cluster0.nauah.mongodb.net/node-chat?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use("/js", express.static(__dirname + "/html"));


app.get("/", (req, res) => {
    if (req.cookies.nick == undefined) {
        res.sendFile(__dirname + '/html/nick/' + 'set-nick.html');
    }
    else {
        res.redirect('/chat');
    }
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/html/main/' + 'index.html');
})

io.on('connection', (socket) => {
    sendData();

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        saveData(msg);
    });

    socket.on('disconnected', () => client.close());
})


server.listen(3000, () => {
    console.log('server started on port 3000');
})

function sendData() {
    client.connect(err => {
        const collection = client.db("node-chat").collection("messages");
        collection.find({}).toArray().then(res => io.emit('old messages', res));
    });
}

function saveData(msg) {
    const collection = client.db("node-chat").collection("messages");
    collection.insertOne(msg);
}