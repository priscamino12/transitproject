const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token manquant" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token invalide" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = decoded; // tu pourras récupérer req.user.id ou req.user.role
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
}

module.exports = authMiddleware;
