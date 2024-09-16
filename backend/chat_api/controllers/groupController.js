const Group = require('../models/Group');
const Message = require('../models/Message');

exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const newGroup = new Group({
      name,
      members
    });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: 'Error creating group' });
  }
};


exports.addUserToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    group.members.push(userId);
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user to group' });
  }
};


exports.sendGroupMessage = async (req, res) => {
  try {
    const { groupId, text } = req.body;
    const newMessage = new Message({
      chatId: groupId,
      sender: req.user.id,
      text
    });
    await newMessage.save();


    req.io.to(groupId).emit('newGroupMessage', newMessage);

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending group message' });
  }
};
