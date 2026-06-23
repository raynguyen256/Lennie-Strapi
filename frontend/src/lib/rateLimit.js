// In-memory sliding-window rate limiter theo IP. An toàn vì app chạy 1 container
// long-running (xem docker-compose.yml), không phải serverless multi-instance
// nên Map này không bị mất giữa các request.
const hits = new Map();

/**
 * @returns {boolean} true nếu được phép request, false nếu vượt rate limit
 */
export function checkRateLimit(key, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const timestamps = (hits.get(key) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    hits.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return true;
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
