'use client';

import { useEffect, useState } from 'react';
import { Mail, Search, UserRound } from 'lucide-react';
import api from '@/lib/axios';
import { AdminCard, AdminPageIntro, AdminStatus } from '@/features/admin/components/AdminShell';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const loadUsers = async () => {
    const { data } = await api.get('/admin/users');
    setUsers(data.users);
  };

  useEffect(() => {
    api.get('/admin/users').then(({ data }) => setUsers(data.users)).catch((error) => setMessage(error.response?.data?.message || 'Unable to load users'));
  }, []);

  const updateUser = async (id, changes) => {
    try {
      await api.patch(`/admin/users/${id}`, changes);
      await loadUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to update user');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((current) => current.filter((user) => user.id !== id));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to delete user');
    }
  };

  const visibleUsers = users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <AdminPageIntro eyebrow="Workspace / Users" title="Users" description="Manage customer accounts and roles with backend-enforced permissions." />
      <div className="mb-5 flex h-11 items-center gap-3 rounded-xl border border-footer bg-white px-3.5 text-[12px] text-second">
        <Search size={16} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search users..." className="w-full bg-transparent outline-none" />
      </div>
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
      <AdminCard className="overflow-hidden">
        <div className="border-b border-footer px-5 py-4 sm:px-6"><p className="text-[12px] font-semibold">{visibleUsers.length} users</p><p className="mt-1 text-[11px] text-second">Live MongoDB data</p></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left"><thead className="bg-secondbg text-[10px] uppercase tracking-[.12em] text-second"><tr><th className="px-6 py-3">Name</th><th className="px-6 py-3">Email</th><th className="px-6 py-3">Role</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Actions</th></tr></thead>
            <tbody className="divide-y divide-footer">{visibleUsers.map((user) => <tr key={user.id} className="hover:bg-secondbg/40"><td className="px-6 py-4"><span className="flex items-center gap-3 text-[12px] font-semibold"><span className="flex size-9 items-center justify-center rounded-xl bg-secondbg"><UserRound size={16} /></span>{user.name}</span></td><td className="px-6 py-4 text-[12px] text-second"><span className="inline-flex items-center gap-2"><Mail size={14} />{user.email}</span></td><td className="px-6 py-4"><select value={user.role} onChange={(event) => updateUser(user.id, { role: event.target.value })} className="rounded-lg border border-footer px-2 py-1 text-xs"><option value="customer">Customer</option><option value="admin">Admin</option></select></td><td className="px-6 py-4"><select value={user.status || 'active'} onChange={(event) => updateUser(user.id, { status: event.target.value })} className="rounded-lg border border-footer px-2 py-1 text-xs"><option value="active">Active</option><option value="suspended">Suspended</option></select><div className="mt-1"><AdminStatus type={(user.status || 'active') === 'active' ? 'green' : 'orange'}>{user.status || 'active'}</AdminStatus></div></td><td className="px-6 py-4"><button onClick={() => deleteUser(user.id)} className="text-xs font-semibold text-red-600 hover:underline">Delete</button></td></tr>)}</tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
