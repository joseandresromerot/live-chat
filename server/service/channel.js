const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const db = require('../db/models');
const { sequelize, AppUser, Channel, ChannelAppUser, Message } = db;

const ChannelService = {};

const getChannelInfoById = async (channelId, sessionUserId) => {
    const channel = await Channel.findByPk(channelId);

    if (!channel) {
        return { success: false, error: "Channel not found" };
    }

    const userInChannel = await ChannelAppUser.findOne({ where: { channel_id: channelId, appuser_id: sessionUserId } });

    if (!userInChannel) {
        await ChannelAppUser.create({
            id: uuidv4(),
            channel_id: channelId,
            appuser_id: sessionUserId
        });
    }

    const members = await sequelize.query(`SELECT B.id, B.username, B.fullname, B.avatar_url FROM channel_appuser A INNER JOIN appuser B ON A.appuser_id = B.id WHERE A.channel_id = '${channelId}'`, {
        model: AppUser,
        mapToModel: true
    });

    return { success: true, channel: { ...channel.toJSON(), members } };
};

const getMessagesByChannelId = async (channelId, sessionUserId) => {
    const channel = await Channel.findByPk(channelId);

    if (!channel) {
        return { success: false, error: "Channel not found" };
    }

    const userInChannel = await ChannelAppUser.findOne({ where: { channel_id: channelId, appuser_id: sessionUserId } });

    if (!userInChannel) {
        return { success: false, error: "User doesn't belong to the channel" };
    }

    const messages = await sequelize.query(
        `SELECT A.id, A.content, A.created_at, A.appuser_id, B.fullname, B.avatar_url 
        FROM message A 
        INNER JOIN appuser B ON A.appuser_id = B.id 
        WHERE A.channel_id = '${channelId}' 
        ORDER BY A.created_at DESC`
    );

    return { success: true, messages: messages[0] };
};

const getChannelsByKeyword = async (keyword) => {
    try {
        const channels = await Channel.findAll({ where: { name: { [Op.iLike]: `%${keyword.trim()}%` } } });
        return { success: true, channels };
    } catch(err) {
        return { success: false, error: err.message };
    }
};

const createMessage = async (channelId, content, sessionUserId) => {
    try {
        if (!content || content.trim().length === 0) {
            return { success: false, error: "Message content cannot be empty" };
        }

        const newMessage = await Message.create({
            id: uuidv4(),
            channel_id: channelId,
            appuser_id: sessionUserId,
            content,
            created_at: parseInt((new Date()).getTime() / 1000)
        });

        return { success: true, newMessage };
    } catch(err) {
        console.info(err);
        return { success: false, error: err.message };
    }
};

const createChannel = async (name, description) => {
    try {
        if (!name || name.trim().length === 0) {
            return { success: false, error: "Channel name is required" };
        }

        if (!description || description.trim().length === 0) {
            return { success: false, error: "Channel description is required" };
        }

        const newChannel = await Channel.create({
            id: uuidv4(),
            name,
            description
        });

        return { success: true, newChannel };
    } catch(err) {
        console.info(err);
        return { success: false, error: err.message };
    }
};

ChannelService.getChannelInfoById = getChannelInfoById;
ChannelService.getMessagesByChannelId = getMessagesByChannelId;
ChannelService.getChannelsByKeyword = getChannelsByKeyword;
ChannelService.createMessage = createMessage;
ChannelService.createChannel = createChannel;

module.exports = ChannelService;