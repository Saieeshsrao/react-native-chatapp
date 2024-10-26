const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String,
}, {
    timestamps: true // Move this outside the field definition
});

const messageModel = mongoose.model('Message', messageSchema);

module.exports=messageModel