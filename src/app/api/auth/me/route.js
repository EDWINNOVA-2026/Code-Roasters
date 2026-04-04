import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return Response.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return Response.json({
      user: {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email, // ✅ ADD THIS
      },
    });
  } catch {
    return Response.json({ user: null });
  }
}