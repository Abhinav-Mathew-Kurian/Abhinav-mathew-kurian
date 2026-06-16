import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Cached connection singleton — required in Next.js dev because module
 * state resets on every hot-reload, which would otherwise open a fresh
 * connection per request and exhaust MongoDB's connection limit.
 */
declare global {
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export function connectToDatabase(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Add it to your .env.local (see .env.example)."
    );
  }

  if (!global._mongooseConn) {
    global._mongooseConn = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  return global._mongooseConn;
}
