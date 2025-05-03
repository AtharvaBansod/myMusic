const jwt = require('jsonwebtoken');
const User = require('../models/user');

const handleTokenRefresh = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  
  const refreshToken = cookies.jwt;
  console.log(refreshToken)
  
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    
    const newAccessToken = jwt.sign(
      { userId: decoded.userId},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    
    // Attach new token to response
    res.locals.newAccessToken = newAccessToken;
    req.userId =  decoded.userId;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

module.exports = handleTokenRefresh;