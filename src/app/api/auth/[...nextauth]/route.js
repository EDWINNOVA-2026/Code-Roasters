import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();

      let existing = await User.findOne({ email: user.email });

      if (!existing) {
        await User.create({
          email: user.email,
          name: user.name,
          role: "user",
        });
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };