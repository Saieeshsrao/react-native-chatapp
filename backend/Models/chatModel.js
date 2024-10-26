const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members:Array,
}, {
    timestamps: true // Move this outside the field definition
});

const chatModel = mongoose.model('Chat', chatSchema);

module.exports = chatModel;