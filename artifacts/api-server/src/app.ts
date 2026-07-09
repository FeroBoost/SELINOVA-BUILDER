import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { readLimiter } from "./middlewares/security";

// Allowed origins: production domain + local dev
const ALLOWED_ORIGINS = [
  "https://www.selinova-tech.at",
  "https://selinova-tech.at",
  "https://selinova-builder.vercel.app",
  // Allow any Vercel preview URL for the project
  /^https:\/\/selinova-builder[a-z0-9-]*\.vercel\.app$/,
  // Local development
  "http://localhost:3000",
  "http://localhost:5173",
];

const app: Express = express();

// ── Security headers ────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

// ── CORS ────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (no origin) and matching origins
      if (!origin) return callback(null, true);
      const allowed = ALLOWED_ORIGINS.some((o) =>
        typeof o === "string" ? o === origin : o.test(origin),
      );
      if (allowed) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Api-Key"],
  }),
);

// ── Logging ─────────────────────────────────────────────────────────────────
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ── Global read rate limit ────────────────────────────────────────────────
app.use(readLimiter);

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api", router);

export default app;
