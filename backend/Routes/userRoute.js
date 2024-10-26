const express = require("express");
const {registerUser,loginUser,getUsers,getAllUsers} = require("../Controllers/userController");

const router = express.Router();
console.log("route")
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/",getUsers);
router.get("/find/:recipientId",getAllUsers)

module.exports = router;
