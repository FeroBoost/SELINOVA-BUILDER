import { type Request, type Response, type NextFunction } from "express";
import rateLimit from "express-rate-limit";

/**
 * Rate limiter for read endpoints (GET) — 120 requests / minute per IP.
 */
export const readLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests — please try again later." },
});

/**
 * Rate limiter for write endpoints (POST / PATCH / DELETE) — 20 requests / minute per IP.
 */
export const writeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many write requests — please try again later." },
});

/**
 * API key guard for write operations.
 * Set ADMIN_API_KEY in your environment.  If the variable is not set the
 * middleware is skipped (useful during local dev without the key configured).
 * Production deployments on Vercel MUST have ADMIN_API_KEY set.
 */
export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const adminKey = process.env.ADMIN_API_KEY;

  // Skip if no key configured (dev convenience — log a warning)
  if (!adminKey) {
    if (process.env.NODE_ENV === "production") {
      res.status(503).json({ error: "Server misconfiguration: ADMIN_API_KEY not set." });
      return;
    }
    next();
    return;
  }

  const provided =
    req.headers["x-api-key"] ??
    req.headers["authorization"]?.replace(/^Bearer\s+/i, "");

  if (!provided || provided !== adminKey) {
    res.status(401).json({ error: "Unauthorized: valid API key required." });
    return;
  }

  next();
}
