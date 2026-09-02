import { AdminCard, AdminPageIntro } from "@/features/admin/components/AdminShell";

export const metadata = { title: "Analytics | Uomo Admin" };

export default function AdminAnalyticsPage() {
  return <div><AdminPageIntro eyebrow="Workspace / Analytics" title="Analytics" description="Track sales performance and customer activity across your store." /><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{[["Conversion rate", "4.82%", "+0.8%"], ["Average order value", "$112.40", "+6.4%"], ["Returning customers", "38.6%", "+3.1%"]].map(([label, value, change]) => <AdminCard key={label} className="p-6"><p className="text-[12px] text-second">{label}</p><p className="mt-3 text-[28px] font-bold tracking-[-.04em]">{value}</p><p className="mt-4 text-[11px] font-semibold text-[#16834b]">{change} vs last month</p></AdminCard>)}</div></div>;
}
