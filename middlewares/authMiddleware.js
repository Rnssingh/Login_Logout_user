
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if token is provided
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user info in request
    next(); // Pass control to next middleware or route
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = ensureAuthenticated;
