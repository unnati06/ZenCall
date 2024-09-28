const User = require('../models/user-model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

//home logic

const home = async(req,res) => {
    try {
        res.status(200).send("welcome to home controller")
    } catch (error) {
        console.log(error);
    }
}


//registration logic

const register = async (req, res) => {
    try {
      
    //   console.log(req.body);s
      const { username, email, phone, password } = req.body;
  
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(400).json({ msg: "email already exists" });
      }

      //hash the password
      const saltRound = 10;
      const hash_password = await bcrypt.hash(password, saltRound);
      const userCreated = await User.create({ username, email, phone, password });
  
      res.status(201).json({ msg: userCreated, token : await userCreated.generateToken(), userId: userCreated._id.toString() });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  //login page
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordValid = await userExist.comparePassword(password);
  
      if (isPasswordValid) {
        const token = await userExist.generateToken();
        
        res.clearCookie("auth_token", {
          httpOnly: true,
          domain: "localhost",
          signed: true,
          path:'/'
        });
        
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        
        res.cookie("auth_token", token, {
          path: '/',
          domain: 'localhost',
          expires,
          httpOnly: true,
          signed: true
        });
  
        res.status(200).json({
          message: "Login Successful",
          token: token,
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
      console.log(req.body);
    }
  };
  
  
const getAllUsers = async(req,res) => {
  try {
    const users = await User.find();
    return res.status(200).json({message: "ok", users})
  } catch (error) {
    console.log(error);
  }
}

const getUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or incorrect format' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from header

  try {
    // Verify token
    const decodedToken = jwt.verify(token, 'secretkey');
    
    // Find user by ID
    const user = await User.findById(decodedToken.userId); // Adjust according to your token payload
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(401).json({ message: 'Unauthorized', error: error.message }); // Include error message for debugging
  }
};



const scheduledMeetings = async(req,res) => {
  const { userId, meetingName, meetingDate, meetingTime } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new meeting to the user's scheduledMeetings array
    user.scheduledMeetings.push({
      meetingName,
      meetingDate,
      meetingTime,
    });

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Meeting scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getScheduledMeetings = async(req,res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and retrieve their scheduled meetings
    const user = await User.findById(userId).select('scheduledMeetings');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ scheduledMeetings: user.scheduledMeetings });
  } catch (error) {
    console.error('Error fetching scheduled meetings:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const addPreviousMeeting = async (req, res) => {
  try {
    const { userId } = req.params; // The user who answered the call
    const { from, to } = req.body; // Caller's and receiver's info

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new meeting entry
    const newMeeting = {
      meetingName: `Call between ${from} and ${to}`,
      meetingDate: new Date(),  // The time the call was answered
      meetingTime: new Date().toLocaleTimeString(),  // Just for display purposes
      from,  // The name or ID of the caller
      to,    // The name or ID of the receiver
      // Optional fields like recordingUrl can be added here
    };

    // Save the meeting in previousMeetings array
    user.previousMeetings.push(newMeeting);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Meeting saved successfully', previousMeetings: user.previousMeetings });
  } catch (error) {
    console.error('Error saving meeting:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPreviousMeeting = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId); // Fetch user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Access previous meetings from the user document
    const previousMeetings = user.previousMeetings;

    res.status(200).json({ previousMeetings });
  } catch (error) {
    console.error('Error fetching previous meetings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const saveRecordings = async(req,res)=> {
  const { userId, recordingUrl } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the recording URL to the user's recordings array
    user.recordings.push(recordingUrl);

    // Save the user with the updated recordings
    await user.save();

    res.status(200).json({ message: 'Recording saved successfully' });
  } catch (error) {
    console.error('Error saving recording:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}




module.exports = {home,register, login, getAllUsers, getUser, scheduledMeetings, getScheduledMeetings, addPreviousMeeting, getPreviousMeeting, saveRecordings};

