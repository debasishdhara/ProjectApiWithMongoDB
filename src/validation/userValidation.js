const { User } = require('@models');


const isEmailTaken = async (email) => {
  const user = await User.findOne({ email });
  return !!user;
};

const isPhoneTaken = async (phone) => {
  const user = await User.findOne({ phone });
  return !!user;
};
module.exports = { isEmailTaken,isPhoneTaken };
