const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    // Expect: "Authorization: Bearer <token>"
    if (!authHeader) {
        return res.status(401).json({ error: "Missing Authorization header" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ error: "Invalid Authorization format" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user identity for downstream handlers
        req.userId = payload.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
