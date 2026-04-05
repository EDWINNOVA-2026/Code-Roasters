"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (role === "driver" && !phone) {
      return toast.error("Phone required for driver");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        fullName,
        email,
        password,
        role,
        phone,
      }),
    });

    const data = await res.json();

    if (!res.ok) return toast.error(data.message);

    toast.success("Account created");

    router.push("/login");
  };

  return (
    <div>
      <h1>Register</h1>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="driver">Driver</option>
      </select>

      <input placeholder="Name" onChange={(e) => setFullName(e.target.value)} />

      {role === "driver" && (
        <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      )}

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}