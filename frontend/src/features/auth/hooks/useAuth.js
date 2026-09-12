'use client';
import { useCallback, useState } from "react";
import api from "@/lib/axios";
import useAuthStore, { useLoginModalStore } from "@/store/authSlice";

export default function useAuth() {
  const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const run = async (request) => { setLoading(true); setError(""); try { return (await request()).data; } catch (e) { const message = e.response?.data?.message || "Something went wrong"; setError(message); throw new Error(message); } finally { setLoading(false); } };
  const login = useCallback((credentials) => run(async () => { const { data } = await api.post("/auth/login", credentials); useAuthStore.getState().setAuth(data); document.cookie = "auth-session=1; path=/; SameSite=Lax"; useLoginModalStore.getState().closeLoginModal(); return { data }; }), []);
  const register = useCallback((payload) => run(() => api.post("/auth/register", payload)), []);
  const logout = useCallback(() => run(async () => { try { await api.post("/auth/logout"); } finally { useAuthStore.getState().clearUser(); document.cookie = "auth-session=; Max-Age=0; path=/"; } return { data: { success: true } }; }), []);
  const forgotPassword = useCallback((email) => run(() => api.post("/auth/forgot-password", { email })), []);
  const resetPassword = useCallback((token, password) => run(() => api.post(`/auth/reset-password/${token}`, { password })), []);
  return { login, register, logout, forgotPassword, resetPassword, loading, error };
}
