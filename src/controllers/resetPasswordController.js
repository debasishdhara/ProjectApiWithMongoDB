const bcrypt = require('bcrypt');
const { User } = require('@models');

const resetPasswordController = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = req.user;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Old password is incorrect',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Invalidate old tokens
    user.tokenVersion += 1;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful. All tokens invalidated.',
    });
  } catch (err) {
    console.error('Reset error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error during password reset',
    });
  }
};

module.exports = resetPasswordController;
