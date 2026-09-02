import { Mail, MoreHorizontal, Plus, Search, UserRound } from "lucide-react";
import { AdminCard, AdminPageIntro, AdminStatus } from "@/features/admin/components/AdminShell";

const users = [
  ["Ahmed Mohamed", "ahmed@example.com", "Seller", "Active"],
  ["Sarah Ali", "sarah@example.com", "Buyer", "Active"],
  ["Khaled Omar", "khaled@example.com", "Seller", "Active"],
  ["Mona Zaki", "mona@example.com", "Buyer", "Inactive"],
  ["Omar Hassan", "omar@example.com", "Admin", "Active"],
];

export const metadata = {
  title: "Users | Uomo Admin",
};

export default function AdminUsersPage() {
  return (
    <div>
      <AdminPageIntro
        eyebrow="Workspace / Users"
        title="Users"
        description="Everyone with a storefront account, across buyers, sellers and admins."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-head px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-black">
            <Plus size={14} /> Invite user
          </button>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="flex h-11 items-center gap-3 rounded-xl border border-footer bg-white px-3.5 text-[12px] text-second">
          <Search size={16} />
          <span>Search users...</span>
        </div>
      </div>

      <AdminCard className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-footer px-5 py-4 sm:px-6">
          <div>
            <p className="text-[12px] font-semibold">{users.length} users</p>
            <p className="mt-1 text-[11px] text-second">Static dashboard preview</p>
          </div>
          <MoreHorizontal size={18} className="text-second" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead className="bg-secondbg text-[10px] uppercase tracking-[.12em] text-second">
              <tr>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Role</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-footer">
              {users.map(([name, email, role, status]) => (
                <tr key={email} className="hover:bg-secondbg/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondbg">
                        <UserRound size={16} strokeWidth={1.6} />
                      </span>
                      <span className="text-[12px] font-semibold">{name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[12px] text-second">
                    <span className="inline-flex items-center gap-2">
                      <Mail size={14} /> {email}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[12px] font-medium">{role}</td>
                  <td className="px-6 py-4">
                    <AdminStatus type={status === "Active" ? "green" : "neutral"}>{status}</AdminStatus>
                  </td>
                  <td className="px-6 py-4">
                    <button className="rounded-lg p-2 text-second hover:bg-secondbg">
                      <MoreHorizontal size={15} />
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
