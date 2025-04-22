const { User } = require('@models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {formatTokenResponse} = require('../tokenresponse/tokenResponse');

// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await User.findNotDeleted();
    res.json({success:true,data:users });
  } catch (err) {
    res.status(200).json({success:false, error: err.message });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const { 
      name, 
      email,
      password,
      phone,
      address,
      city,
      state,
      zip,
      country,
      type,
      status
    } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      name, 
      email,
      password:hashedPassword,
      phone,
      address,
      city,
      state,
      zip,
      country,
      type,
      status
    });
    const savedUser = await user.save();

    res.status(200).json({success:true,data:savedUser, message: 'User created successfully' });
  } catch (err) {
    res.status(200).json({success:false, error: err.message });
  }
};


const getAuthUser = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(200).json({ success: false, message: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(200).json({ success: false, message: 'Invalid refresh token' });
    }

    // Invalidate previous tokens
    if(user.tokenVersion > 50){
      user.tokenVersion = 1;
      await user.save();
    }else{
      user.tokenVersion += 1;
      await user.save();
    }
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, type: user.type , tokenVersion: user.tokenVersion },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const result = formatTokenResponse(accessToken,refreshToken,user);
    res.status(200).json({...result});
  } catch (err) {
    res.status(200).json({ success: false, message: 'Refresh token expired or invalid' });
  }
};
module.exports = {
  getUsers,
  createUser,
  getAuthUser
};
