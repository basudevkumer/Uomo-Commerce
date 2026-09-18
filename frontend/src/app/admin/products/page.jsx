'use client';

import { useEffect, useState } from 'react';
import { Package, Plus } from 'lucide-react';
import api from '@/lib/axios';
import { AdminCard, AdminPageIntro, AdminStatus } from '@/features/admin/components/AdminShell';

const emptyForm = { name: '', price: '', stock: '', category: '' };

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    const [{ data: productData }, { data: categoryData }] = await Promise.all([api.get('/admin/products'), api.get('/admin/categories')]);
    setProducts(productData.products);
    setCategories(categoryData.categories);
  };

  useEffect(() => {
    Promise.all([api.get('/admin/products'), api.get('/admin/categories')]).then(([{ data: productData }, { data: categoryData }]) => { setProducts(productData.products); setCategories(categoryData.categories); }).catch((error) => setMessage(error.response?.data?.message || 'Unable to load products'));
  }, []);

  const createProduct = async (event) => {
    event.preventDefault();
    try {
      await api.post('/admin/products', { ...form, price: Number(form.price), stock: Number(form.stock) });
      setForm(emptyForm);
      setShowForm(false);
      await loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to create product');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts((current) => current.filter((product) => product._id !== id));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to delete product');
    }
  };

  const toggleProduct = async (product) => {
    try {
      await api.patch(`/admin/products/${product._id}`, { status: product.status === 'active' ? 'draft' : 'active' });
      await loadData();
    } catch (error) { setMessage(error.response?.data?.message || 'Unable to update product'); }
  };

  return (
    <div>
      <AdminPageIntro eyebrow="Workspace / Products" title="Products" description="Manage catalogue records stored in your own backend." action={<button onClick={() => setShowForm((value) => !value)} className="inline-flex items-center gap-2 rounded-xl bg-head px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-black"><Plus size={14} /> Add product</button>} />
      {showForm && <AdminCard className="mb-5 p-5"><form onSubmit={createProduct} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><input required placeholder="Product name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-xl border border-footer px-3 py-3 text-sm" /><input required min="0" step="0.01" type="number" placeholder="Price" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="rounded-xl border border-footer px-3 py-3 text-sm" /><input required min="0" type="number" placeholder="Stock" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} className="rounded-xl border border-footer px-3 py-3 text-sm" /><select required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-xl border border-footer px-3 py-3 text-sm"><option value="">Select category</option>{categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}</select><button className="rounded-xl bg-red px-4 py-3 text-xs font-semibold text-white sm:col-span-2 lg:col-span-4">Create product</button></form></AdminCard>}
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
      <AdminCard className="overflow-hidden"><div className="border-b border-footer px-5 py-4 sm:px-6"><p className="text-[12px] font-semibold">{products.length} products</p><p className="mt-1 text-[11px] text-second">Live MongoDB data</p></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-secondbg text-[10px] uppercase tracking-[.12em] text-second"><tr><th className="px-6 py-3">Product</th><th className="px-6 py-3">Category</th><th className="px-6 py-3">Price</th><th className="px-6 py-3">Stock</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Actions</th></tr></thead><tbody className="divide-y divide-footer">{products.map((product) => <tr key={product._id}><td className="px-6 py-5 text-xs font-semibold"><span className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-secondbg"><Package size={16} /></span>{product.name}</span></td><td className="px-6 py-5 text-xs text-second">{product.category?.name}</td><td className="px-6 py-5 text-xs font-semibold">{product.price}</td><td className="px-6 py-5 text-xs text-second">{product.stock}</td><td className="px-6 py-5"><AdminStatus type={product.status === 'active' ? 'green' : 'neutral'}>{product.status}</AdminStatus></td><td className="space-x-3 px-6 py-5"><button onClick={() => toggleProduct(product)} className="text-xs font-semibold text-head hover:underline">Toggle</button><button onClick={() => deleteProduct(product._id)} className="text-xs font-semibold text-red-600 hover:underline">Delete</button></td></tr>)}</tbody></table></div></AdminCard>
    </div>
  );
}
