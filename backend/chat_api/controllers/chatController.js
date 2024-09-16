const Message = require('../models/Message');


exports.sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const newMessage = new Message({
      chatId,
      sender: req.user.id, // authenticated user's ID from JWT
      text
    });
    await newMessage.save();

    req.io.to(chatId).emit('newMessage', newMessage);

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

exports.sendFile = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newMessage = new Message({
      chatId,
      sender: req.user.id, // authenticated user's ID from JWT
      fileUrl: req.file.path, // save file path or URL from Cloudinary
      fileType: req.file.mimetype // store file type (image/video)
    });
    await newMessage.save();

    req.io.to(chatId).emit('newMessage', newMessage);

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending file' });
  }
};
