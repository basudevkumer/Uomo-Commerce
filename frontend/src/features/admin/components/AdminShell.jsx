"use client";

import Link from "next/link";
import { BarChart3, Bell, ChevronDown, FileBarChart, LayoutDashboard, MessageCircle, Menu, Package, RotateCcw, Settings, ShoppingCart, Tags, Users, WalletCards, X, Star, Warehouse } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "WORKSPACE", items: [
    ["Overview", "/admin/dashboard", LayoutDashboard], ["Products", "/admin/products", Package], ["Categories", "/admin/categories", Tags], ["Inventory", "/admin/inventory", Warehouse], ["Orders", "/admin/orders", ShoppingCart], ["Customers", "/admin/customers", Users], ["Reviews", "/admin/reviews", Star],
  ]},
  { label: "SALES", items: [["Payments", "/admin/payments", WalletCards], ["Coupons", "/admin/coupons", Tags], ["Returns & Refunds", "/admin/returns", RotateCcw]] },
  { label: "INSIGHTS", items: [["Analytics", "/admin/analytics", BarChart3], ["Reports", "/admin/reports", FileBarChart]] },
  { label: "CUSTOMER", items: [["Chat", "/admin/chat", MessageCircle], ["Notifications", "/admin/notifications", Bell]] },
  { label: "STORE", items: [["Settings", "/admin/settings", Settings]] },
];

export function AdminCard({ className = "", children }) {
  return <section className={`rounded-2xl border border-footer bg-white ${className}`}>{children}</section>;
}

export function AdminPageIntro({ eyebrow, title, description, action }) {
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
  green: "bg-[#eaf8ef] text-[#16834b]",
  blue: "bg-[#edf4ff] text-[#326ac8]",
  orange: "bg-[#fff5e7] text-[#ad6a00]",
  neutral: "bg-secondbg text-second",
};

export function AdminStatus({ type = "neutral", children }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[type] ?? statusStyles.neutral}`}>{children}</span>;
}

function AdminLogo() {
  return <Link href="/admin/dashboard" className="text-[22px] font-bold tracking-[-0.05em] text-head">uomo<span className="text-red">.</span></Link>;
}

function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open && <button aria-label="Close admin menu" onClick={onClose} className="fixed inset-0 z-40 bg-black/25 md:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-footer bg-white transition-transform md:sticky md:top-0 md:z-30 md:h-screen md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[92px] items-center justify-between border-b border-footer px-7">
          <AdminLogo />
          <button onClick={onClose} aria-label="Close menu" className="rounded-xl p-2 text-second hover:bg-secondbg md:hidden"><X size={20} /></button>
        </div>
        <nav aria-label="Admin workspace" className="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-4 py-7">
          {navigation.map(({ label, items }) => <div key={label} className="space-y-1.5"><p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-second">{label}</p>{items.map(([itemLabel, href, Icon]) => { const active = pathname === href; return <Link key={href} href={href} onClick={onClose} aria-current={active ? "page" : undefined} className={`flex min-h-[43px] items-center gap-3 rounded-[14px] px-4 text-[13px] font-medium transition-all ${active ? "bg-red text-white shadow-[0_8px_20px_rgba(214,0,28,0.16)]" : "text-second hover:bg-secondbg hover:text-head"}`}><Icon size={17} strokeWidth={active ? 2.1 : 1.8} />{itemLabel}</Link>;})}</div>)}
        </nav>
      </aside>
    </>
  );
}

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dashboard-surface text-head">
      <div className="flex min-h-screen">
        <AdminSidebar open={open} onClose={() => setOpen(false)} />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-footer bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-9">
            <button onClick={() => setOpen(true)} aria-label="Open admin menu" className="rounded-xl p-2 text-second hover:bg-secondbg md:hidden"><Menu size={21} /></button>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-right sm:block"><span className="block text-[12px] font-semibold">Alex Morgan</span><span className="block text-[10px] text-second">Administrator</span></span>
              <button className="flex size-8 items-center justify-center rounded-full bg-head text-[10px] font-bold text-white" aria-label="Open profile menu">AM</button>
              <ChevronDown size={15} className="text-second" />
            </div>
          </header>
          <main className="mx-auto min-h-[calc(100vh-76px)] w-full max-w-[1500px] p-4 sm:p-6 lg:p-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
