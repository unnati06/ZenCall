const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const uuid = require('uuid');

const meetingSchema = new mongoose.Schema({
    meetingName: { type: String, required: true },
    meetingDate: { type: Date, required: true },
    meetingTime: { type: String, required: true },
    recordingUrl: { type: String },  // Optional for recorded meetings
  });


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  scheduledMeetings: [meetingSchema],  // Array of meeting objects
  previousMeetings: [meetingSchema],   // Store old meetings here
  recordings: [String],  // Array of URLs or file paths to recordings
});


// Example function to add a new chat message to the user's chat history

//compare passwords
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

// Secure the password with bcrypt
userSchema.pre("save", async function (next) {
    const user = this;
    console.log("actual data ", this);
  
    if (!user.isModified('password')) {
      return next();
    }
  
    try {
      const saltRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, saltRound);
      user.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });


  //jwt

userSchema.methods.generateToken = async function(){
  try {
    return jwt.sign({
      userId : this._id.toString(),
      email : this.email,
    }, "secretkey" , {expiresIn:  "120d"})
  } catch (error) {
    console.log(error);
  }
};


const User = new mongoose.model("USER", userSchema);

module.exports = User;