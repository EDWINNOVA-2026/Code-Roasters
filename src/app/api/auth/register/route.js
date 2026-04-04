import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(req) {
  const { email, password, fullName } = await req.json();

  await connectDB();

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashed,
    name: fullName,
  });

  return Response.json({ success: true });
}