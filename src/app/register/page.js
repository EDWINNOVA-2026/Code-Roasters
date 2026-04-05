"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Eye,
    EyeOff,
    Loader2,
    Zap,
    Truck,
    Building2,
    Shield,
    User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const roles = [
    { id: "user", label: "Patient", icon: User },
    { id: "driver", label: "Driver", icon: Truck },
    { id: "hospital", label: "Hospital", icon: Building2 },
    { id: "admin", label: "Admin", icon: Shield },
];

export default function RegisterPage() {
    const router = useRouter();

    const [role, setRole] = useState("user");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        // 🔐 VALIDATION
        if (!email || !password) {
            return toast.error("Email & Password required");
        }

        if (role === "driver" && !phone) {
            return toast.error("Driver phone required");
        }

        if (role === "hospital" && !hospitalName) {
            return toast.error("Hospital name required");
        }

        if (role !== "admin" && !fullName && role !== "hospital") {
            return toast.error("Name required");
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    role,
                    phone,
                    hospitalName,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success("Account created 🚑");

            setTimeout(() => {
                router.push("/login");
            }, 1000);

        } catch (err) {
            toast.error(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
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
                    Join the fastest emergency response system.
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
                    <h1 className="text-3xl font-bold mb-2 capitalize">
                        {role} Register
                    </h1>

                    {/* FORM */}
                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* USER / DRIVER NAME */}
                        {(role === "user" || role === "driver") && (
                            <input
                                placeholder="Full Name"
                                value={fullName}
                                autoComplete="off"

                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/5"
                            />
                        )}

                        {/* DRIVER PHONE */}
                        {role === "driver" && (
                            <input
                                placeholder="Phone Number"
                                value={phone}
                                autoComplete="off"

                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/5"
                            />
                        )}

                        {/* HOSPITAL NAME */}
                        {role === "hospital" && (
                            <input
                                placeholder="Hospital Name"
                                value={hospitalName}
                                autoComplete="off"

                                onChange={(e) => setHospitalName(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/5"
                            />
                        )}

                        {/* EMAIL */}
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            autoComplete="off"

                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/5"
                        />

                        {/* PASSWORD */}
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

                        {/* SUBMIT */}
                        <button className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-xl flex justify-center">
                            {loading ? <Loader2 className="animate-spin" /> : "Register"}
                        </button>

                    </form>

                    {/* NAVIGATION */}
                    <p className="text-sm mt-4 text-center text-gray-400">
                        Already have account?
                        <button
                            onClick={() => router.push("/login")}
                            className="text-amber-400 ml-2"
                        >
                            Login
                        </button>
                    </p>

                </div>
            </motion.div>
        </div>
    );
}