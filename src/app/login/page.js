"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // 🔥 API AUTH
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isSignUp ? "/api/auth/register" : "/api/auth/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast({
        title: "Success",
        description: isSignUp ? "Account created!" : "Logged in!",
      });

      router.push("/");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="w-full max-w-sm">

        <h1 className="text-3xl font-bold mb-6">
          {isSignUp ? "Create Account" : "Login"}
        </h1>

        <form onSubmit={handleEmailAuth} className="space-y-4">

          {/* Name */}
          <AnimatePresence>
            {isSignUp && (
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 rounded-xl bg-secondary"
              />
            )}
          </AnimatePresence>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-secondary"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-secondary"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : isSignUp ? "Sign Up" : "Login"}
          </motion.button>

        </form>

        {/* Toggle */}
        <p className="text-sm mt-4 text-center">
          {isSignUp ? "Already have account?" : "No account?"}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary ml-2">
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>

      </div>
    </div>
  );
}