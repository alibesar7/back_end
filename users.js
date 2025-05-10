const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true 
    },
  email: {
     type: String, 
     required: true,
     unique: true
     },
  gender: { 
    type: String
   },
  passwordHash: {
     type: String, 
     required: true 
  },
  phone: { 
    type: String,
    required: true },
  result: { 
    type: Number,
     default: 0
     }  
});

module.exports = mongoose.model('User', userSchema);
