const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const db = require('../db/models');
const { AppUser, ChannelAppUser } = db;

const AuthService = {};

const login = async (username, password) => {
    try {
        if (!(username && password)) {
            return { success: false, error: "Enter username and password" };
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

            return {
                success: true,
                user: {
                    username: user.username,
                    fullname: user.fullname,
                    avatar_url: user.avatar_url
                },
                token
            };
        }
        return { success: false, error: "Invalid Credentials" };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

const register = async (fullname, avatar_url, username, password) => {
    try {
        if (!(username && password && fullname)) {
            return { success: false, error: "Enter username, password and full name" };
        }

        const oldUser = await AppUser.findOne({ where: { username } });

        if (oldUser) {
            return { success: false, error: "User Already Exist. Please Login" };
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

        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

const getUserInfo = async (user_id) => {
    const user = await AppUser.findByPk(user_id);
    return { success: true, user };
};

AuthService.login = login;
AuthService.register = register;
AuthService.getUserInfo = getUserInfo;

module.exports = AuthService;