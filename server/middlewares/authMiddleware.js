const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token exists
  if (!token) {
    return res.status(403).json({ message: 'Authorization token required' });
  }

  try {
    // Verify token and extract user information
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET); // Remove "Bearer " from token
    req.user = decoded; // Attach the user details to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { protect, verifyToken };
