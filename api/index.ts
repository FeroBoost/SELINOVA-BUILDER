/**
 * Vercel Serverless Function — wraps the Express API server.
 *
 * All requests to /api/* are routed here (see vercel.json rewrites).
 * Vercel passes the original URL so Express routing works as-is.
 *
 * Required Vercel Environment Variables:
 *   DATABASE_URL  — PostgreSQL connection string (e.g. from Neon, Supabase, etc.)
 *   SESSION_SECRET — Secret for session signing
 */
import app from '../artifacts/api-server/src/app';

export default app;
