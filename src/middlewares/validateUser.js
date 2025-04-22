const { isEmailTaken,isPhoneTaken } = require('../validation/userValidation');

const validateUser = async (req, res, next) => {
  const { 
        name, 
        email, 
        password,
        phone
    } = req.body;

  if (!name || !email) {
    return res.status(200).json({success:false, error: 'Name and email are required' });
  }

  if (await isEmailTaken(email)) {
    return res.status(200).json({success:false, error: 'Email already exists' });
  }

  if (await isPhoneTaken(phone)) {
    return res.status(200).json({success:false, error: 'Phone Number already exists' });
  }

  next();
};

module.exports = validateUser;
