const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // 🔐 pega header Authorization
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ msg: "Sem token, autorização negada" });
    }

    // formato: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(401).json({ msg: "Token inválido" });
  }
};