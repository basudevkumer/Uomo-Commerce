"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Download,
  HelpCircle,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
  UserRound,
  X,
} from "lucide-react";

const navigation = [
  { label: "MY ACCOUNT", items: [
    ["Overview", "/dashboard", LayoutDashboard], ["My Orders", "/dashboard/order", ShoppingBag, "3"], ["Wishlist", "/dashboard/wishlist", Star, "8"], ["Addresses", "/dashboard/address", Truck], ["Account Details", "/dashboard/account-details", Settings],
  ]},
  { label: "SHOPPING", items: [["Cart", "/cart", ShoppingCart], ["Notifications", "/dashboard/notifications", Bell]] },
  { label: "SUPPORT", items: [["Help Center", "/contact", HelpCircle], ["Contact Support", "/contact", MessageCircle]] },
];

function Logo() {
  return (
    <Link href="/" className="text-[22px] font-bold tracking-[-0.05em] text-head">
      uomo<span className="text-red">.</span>
    </Link>
  );
}

function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          aria-label="Close account menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-footer bg-white transition-transform duration-300 md:sticky md:top-0 md:z-30 md:h-screen md:translate-x-0 lg:w-[288px] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[92px] items-center justify-between border-b border-footer px-7">
          <Logo />
          <button onClick={onClose} aria-label="Close menu" className="rounded-xl p-2 text-second hover:bg-secondbg md:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="custom-scrollbar flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-4 py-7">
          <nav aria-label="My account" className="custom-scrollbar flex-1 space-y-6 overflow-y-auto">
            {navigation.map(({ label, items }) => <div key={label} className="space-y-1.5"><p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-second">{label}</p>{items.map(([itemLabel, href, Icon, count]) => { const active = pathname === href; return <Link key={`${itemLabel}-${href}`} href={href} onClick={onClose} aria-current={active ? "page" : undefined} className={`group flex min-h-[43px] items-center justify-between rounded-[14px] px-4 text-[13px] font-medium transition-all ${active ? "bg-red text-white shadow-[0_8px_20px_rgba(214,0,28,0.16)]" : "text-second hover:bg-secondbg hover:text-head"}`}><span className="flex items-center gap-3"><Icon size={17} strokeWidth={active ? 2.1 : 1.8} />{itemLabel}</span>{count && <span className={`min-w-5 rounded-full px-1.5 py-1 text-center text-[10px] font-semibold ${active ? "bg-white/18 text-white" : "bg-secondbg text-second"}`}>{count}</span>}</Link>;})}</div>)}
          </nav>

          <div className="space-y-1.5">
            <Link href="/logout" className="flex items-center gap-3.5 rounded-[14px] px-4 py-3 text-[13px] font-medium text-second hover:bg-secondbg hover:text-head">
              <UserRound size={18} strokeWidth={1.8} /> Sign out
            </Link>
            <div className="mt-5 border-t border-footer px-3 pt-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondbg text-[12px] font-bold text-head">JD</div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-head">Jamie Doe</p>
                  <p className="truncate text-[12px] text-second">jamie@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ onOpen }) {
  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-footer bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-9">
      <div className="flex items-center gap-3">
        <button onClick={onOpen} aria-label="Open account menu" className="rounded-xl p-2 text-second hover:bg-secondbg md:hidden">
          <Menu size={21} />
        </button>
        <div className="hidden h-10 w-[290px] items-center gap-3 rounded-xl bg-secondbg px-3.5 text-[13px] text-second sm:flex">
          <Search size={17} />
          <span>Search anything</span>
          <kbd className="ml-auto rounded-md border border-footer bg-white px-1.5 py-0.5 text-[10px] text-second">⌘ K</kbd>
        </div>
        <button className="rounded-xl p-2 text-second hover:bg-secondbg sm:hidden" aria-label="Search"><Search size={20} /></button>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <button aria-label="Notifications" className="relative rounded-xl p-2 text-second hover:bg-secondbg"><Bell size={19} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-red" /></button>
        <div className="hidden h-6 w-px bg-footer sm:block" />
        <button className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 hover:bg-secondbg">
          <span className="flex size-8 items-center justify-center rounded-full bg-head text-[10px] font-bold text-white">JD</span>
          <span className="hidden text-left sm:block"><span className="block text-[12px] font-semibold text-head">Jamie Doe</span><span className="block text-[10px] text-second">Member</span></span>
          <ChevronDown size={15} className="hidden text-second sm:block" />
        </button>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dashboard-surface text-head">
      <div className="flex min-h-screen">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="min-w-0 flex-1">
          <Header onOpen={() => setOpen(true)} />
          <main className="mx-auto min-h-[calc(100vh-76px)] w-full max-w-[1500px] p-4 sm:p-6 lg:p-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
