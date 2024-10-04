import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextRequest } from "next/server";

// Create the rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 200, // Number of points
  duration: 10 * 60, // Per second(s)
});
// Define the rate limiting function
export async function rateLimit(
  req: NextRequest,
): Promise<{ success: boolean; message?: string }> {
  const ip = req.headers.get("x-forwarded-for") || req.ip || "anonymous"; // Use `req.headers.get` to access headers
  try {
    await rateLimiter.consume(ip, 1);
    return { success: true };
  } catch (e) {
    return {
      success: false,
      message: "Too many requests from this IP, please try again later.",
    };
  }
}
