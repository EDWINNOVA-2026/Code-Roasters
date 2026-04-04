"use client";

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait for auth check
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // ❌ Not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
}