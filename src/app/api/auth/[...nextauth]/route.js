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

    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true, // ✅ ADD THIS

  callbacks: {
  async signIn({ user }) {
    await connectDB();

    let existing = await User.findOne({ email: user.email });

    if (!existing) {
      existing = await User.create({
        email: user.email,
        name: user.name,
        role: "user",
      });
    }

    user.role = existing.role;
    return true;
  },

  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.role = token.role;
    }
    return session;
  },
}
});

export { handler as GET, handler as POST };