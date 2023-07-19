const CHAT_BOT = 'ChatBot';

const socketHandler = (socket) => {
    console.log(`User connected ${socket.id}`);
    
    // Add a user to a room
    socket.on('join_room', (data) => joinChannelHandler(socket, data));

    socket.on('send_message', (data) => sendMessageHandler(socket, data));

    socket.on('leave_room', (data) => leaveChannelHandler(socket, data));
};

const joinChannelHandler = (socket, data) => {
    const { username, channelId } = data; // Data sent from client when join_room event emitted
    socket.join(channelId); // Join the user to a socket room

    let __createdtime__ = Date.now(); // Current timestamp

    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(channelId).emit('user_connected', {
        message: `${username} has joined the chat room`,
        username: CHAT_BOT,
        __createdtime__,
    });
};

const sendMessageHandler = (socket, data) => {
    const { newMessage, channelId } = data;

    let __createdtime__ = Date.now();

    socket.to(channelId).emit('receive_message', {
        channelId,
        newMessage,
        __createdtime__,
    });
};

const leaveChannelHandler = (socket, data) => {
    const { newMessage, channelId } = data;

    let __createdtime__ = Date.now();

    socket.to(channelId).emit('receive_message', {
        channelId,
        newMessage,
        __createdtime__,
    });
};

module.exports = socketHandler;