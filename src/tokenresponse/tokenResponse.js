const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Secret key for signing JWT (should be stored securely in an environment variable)
const secretKey = process.env.JWT_SECRET || '';

// Function to create and send a token response
function generateTokenResponse(user) {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, type: user.type , tokenVersion: user.tokenVersion},
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // short-lived token
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // long-lived token
  );

  return {
    success: true,
    accessToken,
    refreshToken,
    expiresIn: 900 // 15 minutes in seconds
  };
}

const  formatTokenResponse = (token,refreshToken, user) => {
    
    // Optionally exclude password and deletedAt from response
    let { password: _, deletedAt: __, ...userWithoutSensitiveData } = user.toObject();
    if(user.tokenVersion == 1){
        refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // long-lived token
        );
    }
    return {
        success: true,
        accessToken: token,
        refreshToken,
        user: userWithoutSensitiveData,
    };
};

module.exports = {
    generateTokenResponse,
    formatTokenResponse
};
