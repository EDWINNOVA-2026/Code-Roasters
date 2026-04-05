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
            try {
                await connectDB();

                let existing = await User.findOne({ email: user.email });

                if (!existing) {
                    await User.create({
                        email: user.email,
                        name: user.name,
                        role: "user",
                    });
                }
            } catch (err) {
                console.log("DB error:", err.message);
            }

            return true;
        },

        async redirect({ url, baseUrl }) {
            console.log("REDIRECT URL:", url);
            console.log("BASE URL:", baseUrl);
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith("/")) return baseUrl + url;
            return baseUrl;
        }
    },
});

export { handler as GET, handler as POST };