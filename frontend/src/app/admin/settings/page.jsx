import { AdminCard, AdminPageIntro } from "@/features/admin/components/AdminShell";

export const metadata = { title: "Settings | Uomo Admin" };

export default function AdminSettingsPage() {
  return <div><AdminPageIntro eyebrow="Workspace / Settings" title="Settings" description="Manage your store profile and workspace preferences." /><AdminCard className="max-w-[760px] p-6"><h2 className="text-[15px] font-semibold">Store profile</h2><div className="mt-6 grid gap-5 sm:grid-cols-2"><label className="text-[11px] font-semibold text-second">Store name<input defaultValue="Uomo" className="mt-2 h-11 w-full rounded-xl border border-footer px-3 text-[13px] text-head outline-none focus:border-head" /></label><label className="text-[11px] font-semibold text-second">Support email<input defaultValue="support@uomo.com" className="mt-2 h-11 w-full rounded-xl border border-footer px-3 text-[13px] text-head outline-none focus:border-head" /></label></div><button className="mt-7 rounded-xl bg-head px-5 py-3 text-[11px] font-semibold text-white hover:bg-black">Save changes</button></AdminCard></div>;
}
