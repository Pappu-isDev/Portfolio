import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Using 'jose' because standard 'jsonwebtoken' doesn't work in Next.js Edge Runtime

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Define which methods we want to protect
  // We allow GET (so people can see your portfolio)
  // but protect POST, PATCH, and DELETE
  const protectedMethods = ["POST", "PATCH", "DELETE"];

  if (protectedMethods.includes(request.method)) {
    // 2. Get the token from the Authorization header
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }

    try {
      // 3. Verify the token using your JWT_SECRET
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      
      return NextResponse.next(); // Token is valid, let the request through
    } catch (error) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

// 4. Only run this middleware on your API routes
export const config = {
  matcher: "/api/:path*",
};