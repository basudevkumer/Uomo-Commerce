"use client";
import { useEffect } from "react";
import api from "@/lib/axios";
import useAuthStore from "@/store/authSlice";

export default function AuthBootstrap() {
  useEffect(() => {
    // Remove credentials left by the old demo auth implementation; real users live in MongoDB.
    window.localStorage.removeItem("uomo-demo-users");
    window.localStorage.removeItem("auth-storage");
    // The refresh cookie is httpOnly, so the browser sends it without exposing it to JavaScript.
    api.post("/auth/refresh").then(({ data }) => { useAuthStore.getState().setAuth(data); document.cookie = "auth-session=1; path=/; SameSite=Lax"; }).catch(() => { useAuthStore.getState().clearUser(); document.cookie = "auth-session=; Max-Age=0; path=/"; });
  }, []);
  return null;
}
