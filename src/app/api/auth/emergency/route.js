import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const EmergencySchema = new mongoose.Schema({
  userId: String,
  location: {
    lat: Number,
    lng: Number,
  },
  severity: String,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Emergency =
  mongoose.models.Emergency ||
  mongoose.model("Emergency", EmergencySchema);

export async function POST(req) {
  const body = await req.json();

  await connectDB();

  const emergency = await Emergency.create({
    location: body.location,
    severity: body.severity,
  });

  return Response.json({ success: true, emergency });
}