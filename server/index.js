const express = require("express");
http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const auth = require("./middleware/auth");
const socketHandler = require('./socket/handler');
const { Server } = require('socket.io');

const {
    login,
    register,
    getUserInfo
} = require('./service/auth');
const {
    getChannelInfoById,
    getMessagesByChannelId,
    getChannelsByKeyword,
    createMessage,
    createChannel
} = require('./service/channel');

require('dotenv').config();

const PORT = process.env.PORT || 3003;
const HOST = '0.0.0.0';

const app = express();

var corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser())

const server = http.createServer(app);

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
    },
});

// Listen for when the client connects via socket.io-client
io.on('connection', socketHandler);

app.get("/getuserinfo", auth, async (req, res) => {
    return res.json(await getUserInfo(req.user.user_id));
});

app.get("/channel/info/:channel", auth, async (req, res) => {
    return res.json((await getChannelInfoById(req.params.channel, req.user.user_id)));
});

app.get("/channel/messages/:channel", auth, async (req, res) => {
    return res.json((await getMessagesByChannelId(req.params.channel, req.user.user_id)));
});

app.post("/channel/list", auth, async (req, res) => {
    return res.json((await getChannelsByKeyword(req.body.keyword)));
});

app.post("/channel/message", auth, async (req, res) => {
    return res.json((await createMessage(req.body.channelId, req.body.content, req.user.user_id)));
});

app.post("/channel/create", auth, async (req, res) => {
    return res.json((await createChannel(req.body.name, req.body.description)));
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    return res.status(200).send(await login(username, password));
});

app.post("/register", async (req, res) => {
    const { fullname, avatar_url, username, password } = req.body;
    return res.status(200).send(await register(fullname, avatar_url, username, password));
});

server.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});