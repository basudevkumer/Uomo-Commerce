"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  AdminCard,
  AdminPageIntro,
  AdminStatus,
} from "@/features/admin/components/AdminShell";

const emptyForm = { name: "", description: "" };

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    const { data } = await api.get("/admin/categories");
    setCategories(data.categories);
  };

  useEffect(() => {
    loadCategories()
      .catch((error) =>
        setMessage(
          error.response?.data?.message || "Unable to load categories",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const submitCategory = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await api.patch(`/admin/categories/${editingId}`, form);
      } else {
        await api.post("/admin/categories", form);
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadCategories();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save category");
    }
  };

  const startEditing = (category) => {
    setEditingId(category._id);
    setForm({
      name: category.name,
      description: category.description || "",
    });
    setMessage("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  };

  const toggleCategory = async (category) => {
    try {
      await api.patch(`/admin/categories/${category._id}`, {
        isActive: !category.isActive,
      });
      await loadCategories();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to update category");
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await api.delete(`/admin/categories/${id}`);
      setCategories((current) =>
        current.filter((category) => category._id !== id),
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to delete category");
    }
  };

  return (
    <div>
      <AdminPageIntro
        eyebrow="Workspace / Categories"
        title="Categories"
        description="Organise products into backend-managed collections."
      />

      <AdminCard className="mb-5 p-5">
        <form
          onSubmit={submitCategory}
          className="grid gap-3 lg:grid-cols-[1fr_1.5fr_auto_auto]"
        >
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Category name"
            className="h-11 rounded-xl border border-footer px-3 text-sm"
          />
          <input
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            placeholder="Description (optional)"
            className="h-11 rounded-xl border border-footer px-3 text-sm"
          />
          <button className="rounded-xl bg-head px-5 text-xs font-semibold text-white">
            {editingId ? "Save changes" : "Add category"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-xl border border-footer px-5 text-xs font-semibold text-head"
            >
              Cancel
            </button>
          )}
        </form>
      </AdminCard>

      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

      <AdminCard className="overflow-hidden">
        <div className="border-b border-footer px-5 py-4 sm:px-6">
          <p className="text-[12px] font-semibold">
            {loading ? "Loading..." : `${categories.length} categories`}
          </p>
          <p className="mt-1 text-[11px] text-second">Live MongoDB data</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-secondbg text-[10px] uppercase tracking-[.12em] text-second">
              <tr>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3">Visibility</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-footer">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-5 text-xs font-semibold">
                    {category.name}
                  </td>
                  <td className="max-w-[240px] truncate px-6 py-5 text-xs text-second">
                    {category.description || "—"}
                  </td>
                  <td className="px-6 py-5 text-xs text-second">
                    {category.slug}
                  </td>
                  <td className="px-6 py-5">
                    <AdminStatus type={category.isActive ? "green" : "neutral"}>
                      {category.isActive ? "Active" : "Hidden"}
                    </AdminStatus>
                  </td>
                  <td className="space-x-3 whitespace-nowrap px-6 py-5">
                    <button
                      onClick={() => startEditing(category)}
                      className="text-xs font-semibold text-head hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleCategory(category)}
                      className="text-xs font-semibold text-head hover:underline"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => deleteCategory(category._id)}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
