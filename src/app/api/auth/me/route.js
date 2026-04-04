import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return Response.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    const user = await User.findById(decoded.id).select("-password");

    return Response.json({ user });
  } catch {
    return Response.json({ user: null });
  }
}