const Message = require('../models/Message');
const Group = require('../models/Group');

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

   
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
    });


    socket.on('joinGroup', (groupId) => {
      socket.join(groupId);
    });


    socket.on('sendMessage', async (messageData) => {
      const newMessage = new Message({
        chatId: messageData.chatId,
        sender: messageData.sender,
        text: messageData.text
      });
      await newMessage.save();
      io.to(messageData.chatId).emit('newMessage', newMessage);
    });


    socket.on('sendGroupMessage', async (messageData) => {
      const newMessage = new Message({
        chatId: messageData.groupId,
        sender: messageData.sender,
        text: messageData.text
      });
      await newMessage.save();
      io.to(messageData.groupId).emit('newGroupMessage', newMessage);
    });

    socket.on('typing', (data) => {
      socket.broadcast.to(data.chatId).emit('typing', data);
    });


    socket.on('readReceipt', async (messageId) => {
      const message = await Message.findById(messageId);
      if (message) {
        message.read = true;
        await message.save();
        io.to(message.chatId).emit('messageRead', messageId);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = chatSocket;
