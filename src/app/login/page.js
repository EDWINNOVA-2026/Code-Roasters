"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Zap,
  Truck,
  Building2,
  Shield,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const roles = [
  { id: "user", label: "Patient", icon: User },
  { id: "driver", label: "Driver", icon: Truck },
  { id: "hospital", label: "Hospital", icon: Building2 },
  { id: "admin", label: "Admin", icon: Shield },
];

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Enter email & password");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Login successful 🚑");

      const redirectMap = {
        user: "/",
        driver: "/driver",
        hospital: "/hospital",
        admin: "/admin",
      };

      setTimeout(() => {
        window.location.href = redirectMap[role];
      }, 800);

    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GOOGLE LOGIN (ONLY USER)
 const handleGoogleLogin = () => {
  signIn("google", {
    callbackUrl: "/",
  });
};
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT PANEL */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 bg-gradient-to-br from-primary via-amber-500 to-primary flex flex-col items-center justify-center p-10 text-black"
      >
        <div className="flex items-center gap-2 mb-6">
          <Zap />
          <h2 className="text-2xl font-bold">1 Minute Ambulance</h2>
        </div>

        <img src="/login-illustration.png" className="w-[320px] mb-6" />

        <p className="text-sm text-center max-w-md">
          AI-powered emergency response at your fingertips.
        </p>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div className="flex-1 bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-white">

          {/* ROLE SWITCH */}
          <div className="flex gap-1 p-1 mb-6 rounded-xl bg-white/5 border border-white/10">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex-1 py-2 text-xs rounded-lg flex items-center justify-center gap-1 ${role === r.id
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-black"
                    : "text-gray-400"
                    }`}
                >
                  <Icon size={14} />
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* HEADING */}
          <h1 className="text-3xl font-bold mb-1">
            {role.charAt(0).toUpperCase() + role.slice(1)} Login
          </h1>

          {/* GOOGLE LOGIN */}
          {role === "user" && (
            <>
              <button
                onClick={handleGoogleLogin}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-4 h-4"
                />
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            </>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              autoComplete="off"

              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="new-password"

                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-xl flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </button>

          </form>

          {/* NAVIGATION */}
          <p className="text-sm mt-4 text-center text-gray-400">
            Don't have account?
            <button
              onClick={() => router.push("/register")}
              className="text-amber-400 ml-2"
            >
              Sign Up
            </button>
          </p>

        </div>
      </motion.div>
    </div>
  );
}