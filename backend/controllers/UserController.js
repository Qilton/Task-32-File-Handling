const UserModel=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const path = require('path');
require("../models/db")
const fs=require('fs')


const filePath = path.resolve(__dirname, '../data.json');


const readUserData = () => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error reading file:", err);
   }
};

const writeUserData = (users) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users), 'utf8');
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

const save = async (req, res, next) => {
  try {
    
    const users = readUserData();
  
    users.push(req.body);
    writeUserData(users);
    
    console.log("User saved successfully");
    res.status(201).json({ message: "Signup Successfully", success: true });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getUsers = (req, res) => {
    try {
      const users = readUserData();
      
      res.status(200).json({ users, success: true });
    } catch (err) {
      console.error("Error reading users:", err);
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };

module.exports = { save ,getUsers};
