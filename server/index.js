const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const auth = require("./middleware/auth");
const { Op } = require("sequelize");
const db = require('./db/models');
const { sequelize, AppUser, Channel, ChannelAppUser } = db;

require('dotenv').config();

const PORT = process.env.PORT || 3003;
const HOST = '0.0.0.0';

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser())

app.get("/api", async (req, res) => {
    const users = await AppUser.findAll();
    res.json({ message: "Hola desde el servidor!", user: users[0].toJSON() });
});

app.get("/test", auth, async (req, res) => {
    // Cookies that have not been signed
    console.log('user: ', req.user);
    
    res.json({ message: "ok"});
});

app.get("/getuserinfo", auth, async (req, res) => {
    res.json({ success: true, user: req.user });
});

app.get("/channel/info/:channel", auth, async (req, res) => {
    const channelId = req.params.channel;
    const channel = await Channel.findByPk(channelId);

    if (!channel) {
        res.json({ success: false, error: "Channel not found" });
        return;
    }

    const userInChannel = await ChannelAppUser.findOne({ where: { channel_id: channelId, appuser_id: req.user.user_id } });

    if (!userInChannel) {
        res.json({ success: false, error: "User doesn't belong to the channel" });
        return;
    }

    const members = await sequelize.query(`SELECT B.id, B.username, B.fullname, B.avatar_url FROM channel_appuser A INNER JOIN appuser B ON A.appuser_id = B.id WHERE A.channel_id = '${channelId}'`, {
        model: AppUser,
        mapToModel: true
    });

    res.json({ success: true, channel: { ...channel.toJSON(), members } });
});

app.post("/channel/list", auth, async (req, res) => {
    try {
        const { keyword } = req.body;
        const channels = await Channel.findAll({ where: { name: { [Op.iLike]: `%${keyword.trim()}%` } } });
        res.json({ success: true, channels });
    } catch(err) {
        res.json({ success: false, error: err.message });
    }
    
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            res.status(200).send({ success: false, error: "Enter username and password" });
        }

        const user = await AppUser.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.id, username },
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            res.cookie("access_token", token, { httpOnly: true }).status(200).json({
                success: true,
                user: {
                    username: user.username,
                    fullname: user.fullname,
                    avatar_url: user.avatar_url
                }
            });
            return;
        }
        res.status(200).send({ success: false, error: "Invalid Credentials" });
    } catch (err) {
        return res.status(200).send({ success: false, error: err.message });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { fullname, avatar_url, username, password } = req.body;

        if (!(username && password && fullname)) {
            res.status(200).send({ success: false, error: "Enter username, password and full name" });
        }

        const oldUser = await AppUser.findOne({ where: { username } });

        if (oldUser) {
            return res.status(200).send({ success: false, error: "User Already Exist. Please Login" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await AppUser.create({
            id: uuidv4(),
            fullname,
            avatar_url,
            username: username.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        await ChannelAppUser.create({
            id: uuidv4(),
            channel_id: 'f9d8cd62-5161-40b9-8d60-a6f804a5f46a',
            appuser_id: user.id
        });

        res.status(201).json({ success: true });
    } catch (err) {
        return res.status(200).send({ success: false, error: err.message });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});