import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { fullName, email, password, role, phone } = await req.json();

  await connectDB();

  const existing = await User.findOne({ email });

  if (existing) return Response.json({ message: "User exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    name: fullName,
    email,
    password: hashed,
    role,
    phone: role === "driver" ? phone : null,
  });

  return Response.json({ message: "Registered" });
}