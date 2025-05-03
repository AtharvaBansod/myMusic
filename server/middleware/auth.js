const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // Token expired - try to refresh
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ 
          message: 'Access token expired',
          code: 'TOKEN_EXPIRED'
        });
      }
      return res.sendStatus(403);
    }
    
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyJWT;