const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const AppUser = require('./db/models').AppUser;
const { v4: uuidv4 } = require('uuid');
const auth = require("./middleware/auth");

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
        console.log(err);
    }
});

app.post("/register", async (req, res) => {
    try {
        const { fullname, avatar_url, username, password } = req.body;

        if (!(username && password && fullname)) {
            res.status(400).send("Enter username, password and full name");
        }

        const oldUser = await AppUser.findOne({ where: { username } });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await AppUser.create({
            id: uuidv4(),
            fullname,
            avatar_url,
            username: username.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user.id, username },
            process.env.JWT_TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        res.status(201).json({
            username: user.username,
            fullname: user.fullname,
            avatar_url: user.avatar_url,
            token
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});