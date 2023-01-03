const jwt = require('jsonwebtoken');

const genToken = (user, t) => {
    const token = jwt.sign(
      {
        uuid: user.uuid,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: t } // t - time
    );
    return token;
};


module.exports = { genToken }