"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import api from "@/lib/axios";
import useAuthStore from "@/store/authSlice";
import { Card, PageIntro } from "../ui/DashboardPrimitives";

export default function DashboardAccDetails() {
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/me")
      .then(({ data }) =>
        setForm({ name: data.user.name, email: data.user.email }),
      )
      .catch((error) =>
        setMessage(error.response?.data?.message || "Unable to load profile"),
      );
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.patch("/me", { name: form.name });
      setUser(data.user);
      setForm({ name: data.user.name, email: data.user.email });
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to update profile");
    }
  };

  return (
    <div>
      <PageIntro
        eyebrow="My account / Settings"
        title="Account details"
        description="Update your personal information securely through the backend."
      />
      <Card className="max-w-[900px] p-5 sm:p-7">
        <form onSubmit={saveProfile}>
          <h2 className="text-[15px] font-semibold">Personal information</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold text-second">
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                className="h-12 w-full rounded-xl border border-footer bg-white px-4 text-[13px] outline-none focus:border-head"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-semibold text-second">
                Email address
              </span>
              <input
                readOnly
                type="email"
                value={form.email}
                className="h-12 w-full rounded-xl border border-footer bg-secondbg px-4 text-[13px] text-second outline-none"
              />
            </label>
          </div>
          {message && <p className="mt-5 text-sm text-second">{message}</p>}
          <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-head px-5 py-3 text-[11px] font-semibold text-white hover:bg-black">
            <Save size={14} /> Save changes
          </button>
        </form>
      </Card>
    </div>
  );
}
