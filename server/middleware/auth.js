const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!(req.headers && req.headers.autorization)) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = req.headers.autorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;