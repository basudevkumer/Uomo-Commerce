import { Eye, MoreHorizontal } from "lucide-react";
import { AdminCard, AdminPageIntro, AdminStatus } from "@/features/admin/components/AdminShell";

const orders = [
  ["#10482", "Olivia Martin", "Minimal leather tote", "$128.00", "Delivered"],
  ["#10481", "Jackson Lee", "Classic cotton shirt", "$84.00", "Processing"],
  ["#10480", "Sofia Davis", "Everyday sneakers", "$156.00", "Shipped"],
  ["#10479", "Noah Wilson", "Wool blend overshirt", "$112.00", "Delivered"],
  ["#10478", "Emma Brown", "Relaxed linen trousers", "$96.00", "Processing"],
];

const statusType = { Delivered: "green", Shipped: "blue", Processing: "orange" };

export const metadata = { title: "Orders | Uomo Admin" };

export default function AdminOrdersPage() {
  return (
    <div>
      <AdminPageIntro eyebrow="Workspace / Orders" title="Orders" description="Review recent purchases, payment status and fulfilment progress." />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {[['Total orders', '1,284'], ['Processing', '86'], ['Revenue', '$48,294']].map(([label, value]) => <AdminCard key={label} className="p-5"><p className="text-[12px] text-second">{label}</p><p className="mt-2 text-[24px] font-bold tracking-[-.04em]">{value}</p></AdminCard>)}
      </div>
      <AdminCard className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-footer px-5 py-4 sm:px-6"><div><p className="text-[12px] font-semibold">Recent orders</p><p className="mt-1 text-[11px] text-second">Static dashboard preview</p></div><MoreHorizontal size={18} className="text-second" /></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-secondbg text-[10px] uppercase tracking-[.12em] text-second"><tr><th className="px-6 py-3">Order</th><th className="px-6 py-3">Customer</th><th className="px-6 py-3">Product</th><th className="px-6 py-3">Total</th><th className="px-6 py-3">Status</th><th /></tr></thead><tbody className="divide-y divide-footer">{orders.map(([id, customer, product, total, status]) => <tr key={id} className="hover:bg-secondbg"><td className="px-6 py-5 text-[12px] font-semibold">{id}</td><td className="px-6 py-5 text-[12px]">{customer}</td><td className="px-6 py-5 text-[12px] text-second">{product}</td><td className="px-6 py-5 text-[12px] font-semibold">{total}</td><td className="px-6 py-5"><AdminStatus type={statusType[status]}>{status}</AdminStatus></td><td className="px-6 py-5"><button aria-label={`View ${id}`} className="rounded-lg p-2 text-second hover:bg-secondbg"><Eye size={15} /></button></td></tr>)}</tbody></table></div>
      </AdminCard>
    </div>
  );
}
