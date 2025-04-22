const { User } = require('@models');
const bcrypt = require('bcrypt');
const {generateTokenResponse} = require('../tokenresponse/tokenResponse');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        // Check if user exists
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(200).json({ success: false, error: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({ success: false, error: 'Invalid email or password' });
        }
        
        // Invalidate previous tokens
        user.tokenVersion = 1;
        await user.save();
        // Generate the token response
        let tokenResponse = generateTokenResponse(user);        
        // Optionally exclude password and deletedAt from response
        let { password: _, deletedAt: __, ...userWithoutSensitiveData } = user.toObject();

        tokenResponse.user = userWithoutSensitiveData;
        // Return success response
        res.status(200).json({
            ...tokenResponse
        });
    } catch (err) {
        res.status(200).json({ success: false, error: err.message });
    }
};


module.exports = {
    loginUser
};
