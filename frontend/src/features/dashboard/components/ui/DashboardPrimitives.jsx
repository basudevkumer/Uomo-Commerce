import { ArrowUpRight, Eye } from "lucide-react";

export const orders = [
  { id: "#UO-10482", date: "Mar 18, 2026", product: "Wool blend overcoat", total: "$289.00", status: "Delivered" },
  { id: "#UO-10461", date: "Mar 11, 2026", product: "Leather Chelsea boots", total: "$198.00", status: "Shipped" },
  { id: "#UO-10428", date: "Mar 02, 2026", product: "Cotton jersey t-shirt", total: "$49.00", status: "Processing" },
];

export function Card({ className = "", children }) {
  return <section className={`rounded-2xl border border-footer bg-white ${className}`}>{children}</section>;
}

export function PageIntro({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red">{eyebrow}</p>
        <h1 className="mt-2 text-[30px] font-bold tracking-[-0.045em] text-head sm:text-[36px]">{title}</h1>
        <p className="mt-2 max-w-[620px] text-[13px] leading-6 text-second">{description}</p>
      </div>
      {action}
    </div>
  );
}

const statusStyles = {
  Delivered: "bg-[#eaf8ef] text-[#16834b]",
  Shipped: "bg-[#edf4ff] text-[#326ac8]",
  Processing: "bg-[#fff5e7] text-[#ad6a00]",
  Cancelled: "bg-[#fff0f0] text-red",
};

export function Status({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[status] ?? "bg-secondbg text-second"}`}>{status}</span>;
}

export function OrderTable() {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-footer px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-[15px] font-semibold">Recent orders</h2>
          <p className="mt-1 text-[12px] text-second">Your latest purchases</p>
        </div>
        <a href="/dashboard/order" className="inline-flex items-center gap-1 text-[11px] font-semibold text-second hover:text-head">
          View all <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left">
          <thead className="bg-secondbg text-[10px] uppercase tracking-[0.12em] text-second">
            <tr>
              <th className="px-5 py-3 font-semibold sm:px-6">Order</th>
              <th className="px-5 py-3 font-semibold sm:px-6">Date</th>
              <th className="px-5 py-3 font-semibold sm:px-6">Total</th>
              <th className="px-5 py-3 font-semibold sm:px-6">Status</th>
              <th className="px-5 py-3 sm:px-6" />
            </tr>
          </thead>
          <tbody className="divide-y divide-footer">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-secondbg">
                <td className="px-5 py-5 text-[12px] font-semibold sm:px-6">{order.id}<span className="mt-1 block max-w-[180px] truncate text-[11px] font-normal text-second">{order.product}</span></td>
                <td className="px-5 py-5 text-[12px] text-second sm:px-6">{order.date}</td>
                <td className="px-5 py-5 text-[12px] font-semibold sm:px-6">{order.total}</td>
                <td className="px-5 py-5 sm:px-6"><Status status={order.status} /></td>
                <td className="px-5 py-5 sm:px-6"><button aria-label={`View ${order.id}`} className="rounded-lg border border-footer p-2 text-second hover:bg-secondbg"><Eye size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
