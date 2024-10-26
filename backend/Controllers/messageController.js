const { get } = require('mongoose');
const messageModel = require('../Models/messagemodel');

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message=new messageModel({
        chatId,
        senderId,
        text
    });

    try{
        const result=await message.save();
        res.status(200).json(result);

    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
    }

    const getMessages = async (req, res) => {
        const {chatId}=req.params
        try {
            const messages = await messageModel.find({chatId});
            res.status(200).json(messages);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

module.exports = { createMessage,getMessages};