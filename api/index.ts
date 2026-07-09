/**
 * Vercel Serverless Function — Express API handler.
 *
 * Vercel routes all /api/* requests here (see rewrites in vercel.json).
 * The app mounts routes at both /api (if Vercel preserves the original path)
 * and / (if Vercel strips the /api prefix) for maximum compatibility.
 *
 * Required Vercel Environment Variables:
 *   DATABASE_URL    — PostgreSQL connection string (Neon, Supabase, etc.)
 *   SESSION_SECRET  — Secret for session signing
 */
import express from 'express';
import cors from 'cors';
import router from '../artifacts/api-server/src/routes';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount at /api — works when Vercel preserves the original URL path (rewrites behavior)
app.use('/api', router);

// Mount at / — safety net if Vercel strips the /api prefix before invoking the function
app.use('/', router);

export default app;
