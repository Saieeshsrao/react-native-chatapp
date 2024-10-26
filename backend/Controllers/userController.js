const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtkey=process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey, { expiresIn: '3d' });
}
const registerUser = async (req, res) => {
    try{

    const { name, email, password } = req.body;
    let user=await userModel.findOne({email});
    if(user){
        return res.status(400).json("User already exists");
    }

    if(!name || !email || !password){
        return res.status(400).json("All fields are required");
    }

    if(!validator.isEmail(email)){
        return res.status(400).json("Invalid email");
    }

    if(!validator.isStrongPassword(password)){  
        return res.status(400).json("Password is not strong enough");
    }

    user=new userModel({
        name,
        email,
        password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = createToken(user._id);

    return res.status(200).json({
        _id: user._id,name, email, token});
    }
    catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {
    console.log("in loginuser")
    const { email, password } = req.body;
    try{
    const user = await userModel.findOne({ email });  
    if (!user) {
        console.log("User not found");
        return res.status(400).json("User not found");
    }    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        console.log("Invalid credentials");
        return res.status(400).json("Invalid credentials");
    }
    const token = createToken(user._id);
    return res.status(200).json({
        _id: user._id, name: user.name, email, token
    })  
    }
    catch(error){
        console.log("Server error:", error);
        return res.status(500).json(error);
    }
}

const getUsers = async (req, res) => {
   
    
    try{
    const users = await userModel.find();
    if(!users){
        return res.status(404).json("User not found");
    }
    return res.status(200).json(users);
    }
    catch(error){
        console.log(error); 
        return res.status(500).json(error);
    }
}
const getAllUsers = async (req, res) => {
    const { recipientId } = req.params; 
    // Extract recipientId from request parameters

    try {
        const user = await userModel.findOne({ _id: recipientId  }); // Find users except the one with recipientId
        if (!user) {
            return res.status(404).json("No users found");
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
module.exports = {
    registerUser,
    loginUser,getUsers,getAllUsers
};