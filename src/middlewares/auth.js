// Middleware to verify JWT
const jwt = require('jsonwebtoken');
const { User } = require('@models'); // Adjust path

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(200).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || decoded.tokenVersion !== user.tokenVersion) {
      return res.status(200).json({ success: false, message: 'Token invalidated' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(200).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = authenticateToken;