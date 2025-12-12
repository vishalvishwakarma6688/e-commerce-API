import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ ok: false, message: "Authorization header missing" });
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({ ok: false, message: "Invalid Authorization format" });
        }
        const token = parts[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.sub;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({ ok: false, message: "Invalid or expired token" });
    }
}