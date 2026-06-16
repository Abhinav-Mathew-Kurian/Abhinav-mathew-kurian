/**
 * Mongoose documents (ObjectId, Date, etc.) aren't directly serializable
 * across the Server Component boundary. This strips them down to plain
 * JSON-safe objects.
 */
export function toPlain<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}
