"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  CreditCard,
  Gift,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Card, OrderTable, PageIntro } from "../ui/DashboardPrimitives";

const stats = [
  ["Orders placed", "24", "+3 this month", ShoppingBag],
  ["Wishlist items", "12", "+2 this month", Heart],
  ["Store credit", "$84", "Available balance", CreditCard],
];

export default function DashboardAccount() {
  return (
    <div>
      <PageIntro
        eyebrow="My account"
        title="Account overview"
        description="Welcome back, Jamie. Keep track of your orders, saved pieces and account preferences."
        action={
          <Link
            href="/dashboard/account-details"
            className="inline-flex items-center gap-2 rounded-xl bg-head px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-black"
          >
            Account settings <ArrowUpRight size={14} />
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([label, value, change, Icon]) => (
          <Card key={label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] text-second">{label}</p>
                <p className="mt-2 text-[28px] font-bold tracking-[-0.04em]">
                  {value}
                </p>
              </div>
              <div className="rounded-xl bg-secondbg p-2.5 text-head">
                <Icon size={18} />
              </div>
            </div>
            <p className="mt-4 text-[11px] font-medium text-[#16834b]">
              {change}
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_330px]">
        <OrderTable />
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#fff1f1] p-3 text-red">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold">Uomo member</h2>
              <p className="mt-1 text-[11px] text-second">
                Exclusive benefits & rewards
              </p>
            </div>
          </div>
          <div className="mt-7 space-y-4 text-[12px]">
            <div className="flex justify-between border-b border-footer pb-3">
              <span className="text-second">Member since</span>
              <b>Jan 2024</b>
            </div>
            <div className="flex justify-between border-b border-footer pb-3">
              <span className="text-second">Reward points</span>
              <b>2,480 pts</b>
            </div>
            <div className="flex justify-between">
              <span className="text-second">Next tier</span>
              <b>520 pts away</b>
            </div>
          </div>
          <button className="mt-7 w-full rounded-xl bg-head py-3 text-[11px] font-semibold text-white">
            Explore rewards
          </button>
        </Card>
      </div>
    </div>
  );
}
