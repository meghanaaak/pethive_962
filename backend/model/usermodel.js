// user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
},
{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: true,
//       },
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     mobile: { type: String, required: true },
//     role: { type: String, enum: ['User', 'Admin'], default: 'User' }, // Role field
// }, { timestamps: true });

// const User = mongoose.models.Users || mongoose.model('Users', userSchema);

// module.exports = User;

