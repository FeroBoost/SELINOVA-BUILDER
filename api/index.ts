/**
 * Vercel Serverless Function — Express API handler.
 *
 * All /api/* requests are routed here (see rewrites in vercel.json).
 * Security: helmet headers, CORS allowlist, rate limiting, API key guard
 * on write endpoints.
 *
 * Required Vercel Environment Variables:
 *   DATABASE_URL    — PostgreSQL connection string (Neon, Supabase, etc.)
 *   SESSION_SECRET  — Secret for session signing (min 32 chars)
 *   ADMIN_API_KEY   — Secret key required for POST/PATCH/DELETE endpoints
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from '../artifacts/api-server/src/routes';
import { readLimiter } from '../artifacts/api-server/src/middlewares/security';

const ALLOWED_ORIGINS = [
  'https://www.selinova-tech.at',
  'https://selinova-tech.at',
  'https://selinova-builder.vercel.app',
  /^https:\/\/selinova-builder[a-z0-9-]*\.vercel\.app$/,
  'http://localhost:3000',
  'http://localhost:5173',
];

const app = express();

// ── Security headers ─────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false, // Frontend is separate; API returns JSON only
    crossOriginEmbedderPolicy: false,
  }),
);

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = ALLOWED_ORIGINS.some((o) =>
        typeof o === 'string' ? o === origin : o.test(origin),
      );
      if (allowed) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
  }),
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use(readLimiter);

// ── Routes (mounted at both /api and / for Vercel path compatibility) ─────────
app.use('/api', router);
app.use('/', router);

export default app;
