const Group = require('../models/Group');
const Message = require('../models/Message');


const isMemberOfGroup = async (req, res, next) => {
  try {
    const { groupId } = req.body;
    const group = await Group.findById(groupId);

    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'You are not a member of this group' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const isMessageSender = async (req, res, next) => {
  try {
    const { messageId } = req.body;
    const message = await Message.findById(messageId);

    if (!message) return res.status(404).json({ message: 'Message not found' });

    if (message.sender.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You are not the sender of this message' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const permissionsMiddleware = (action) => {
  switch (action) {
    case 'sendGroupMessage':
      return isMemberOfGroup;
    case 'deleteMessage':
      return isMessageSender;
    default:
      return (req, res, next) => next();
  }
};

module.exports = permissionsMiddleware;
