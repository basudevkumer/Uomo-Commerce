import { Bell, Check } from "lucide-react";
import { Card, PageIntro } from "@/features/dashboard/components/ui/DashboardPrimitives";

const notifications = [
  ["Your order #UO-10482 has been delivered.", "Order update", "2 hours ago", true],
  ["Your wishlist item is back in stock.", "Wishlist", "Yesterday", true],
  ["You earned 120 reward points from your last order.", "Rewards", "Mar 16, 2026", false],
];

export const metadata = { title: "Notifications | Uomo" };

export default function DashboardNotificationsPage() {
  return <div><PageIntro eyebrow="My account / Notifications" title="Notifications" description="Stay up to date with your orders, wishlist and member rewards." /><Card className="max-w-[900px] overflow-hidden"><div className="flex items-center justify-between border-b border-footer px-5 py-5 sm:px-6"><div><h2 className="text-[15px] font-semibold">Your notifications</h2><p className="mt-1 text-[12px] text-second">{notifications.filter((item) => item[3]).length} unread updates</p></div><button className="inline-flex items-center gap-2 text-[11px] font-semibold text-second hover:text-head"><Check size={14} /> Mark all read</button></div><div className="divide-y divide-footer">{notifications.map(([message, type, time, unread]) => <div key={message} className={`flex gap-4 px-5 py-5 sm:px-6 ${unread ? "bg-[#fffafa]" : ""}`}><span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${unread ? "bg-[#fff1f1] text-red" : "bg-secondbg text-second"}`}><Bell size={17} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-[13px] font-semibold">{message}</p>{unread && <span className="size-1.5 rounded-full bg-red" />}</div><p className="mt-1 text-[11px] text-second">{type} · {time}</p></div></div>)}</div></Card></div>;
}
