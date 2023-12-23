const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const verifyAccessToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "No token detected" });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    if (!decoded) {
      return res.status(401).json({ error: "unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ error: "unauthorized" });
  }
  return next();
};

module.exports = {
  verifyAccessToken,
};
