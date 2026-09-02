"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Plus,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdminCard, AdminPageIntro, AdminStatus } from "./AdminShell";

const stats = [
  ["Total revenue", "$48,294.00", "+12.5%", DollarSign],
  ["Total orders", "1,284", "+8.2%", ShoppingCart],
  ["Active customers", "8,549", "+4.6%", Users],
  ["Products sold", "3,642", "+10.1%", Package],
];

const orders = [
  ["#10482", "Olivia Martin", "Minimal leather tote", "$128.00", "Delivered"],
  ["#10481", "Jackson Lee", "Classic cotton shirt", "$84.00", "Processing"],
  ["#10480", "Sofia Davis", "Everyday sneakers", "$156.00", "Shipped"],
  ["#10479", "Noah Wilson", "Wool blend overshirt", "$112.00", "Delivered"],
];

const top = [
  ["Leather tote bag", "428", "$12,840"],
  ["Everyday sneakers", "312", "$9,840"],
  ["Classic cotton shirt", "289", "$7,514"],
  ["Wool overshirt", "198", "$5,340"],
];

const revenue = [
  { month: "Jan", value: 21400 }, { month: "Feb", value: 26800 },
  { month: "Mar", value: 23900 }, { month: "Apr", value: 31200 },
  { month: "May", value: 28600 }, { month: "Jun", value: 36700 },
  { month: "Jul", value: 32100 }, { month: "Aug", value: 39800 },
  { month: "Sep", value: 34500 }, { month: "Oct", value: 41200 },
  { month: "Nov", value: 37600 }, { month: "Dec", value: 48294 },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-footer bg-white px-3.5 py-2.5 text-[11px] shadow-lg">
      <p className="font-semibold text-head">{label}</p>
      <p className="mt-0.5 text-second">${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

function SalesChart() {
  return (
    <div className="mt-6 h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenue} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-red)" stopOpacity={0.28} />
              <stop offset="95%" stopColor="var(--color-red)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--color-footer)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-second)" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--color-second)" }} tickFormatter={(v) => `$${v / 1000}k`} width={44} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--color-footer)" }} />
          <Area type="monotone" dataKey="value" stroke="var(--color-red)" strokeWidth={2.5} fill="url(#salesFill)" activeDot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div>
      <AdminPageIntro
        eyebrow="Workspace / Overview"
        title="Good morning, Alex"
        description="A clear view of your store performance, sales activity and product health."
        action={
          <Link href="/admin/products" className="inline-flex items-center gap-2 rounded-xl bg-head px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-black">
            <Plus size={14} /> Add product
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([t, v, c, Icon]) => (
          <AdminCard key={t} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] text-second">{t}</p>
                <p className="mt-2 text-[27px] font-bold tracking-[-.04em]">{v}</p>
              </div>
              <div className="rounded-xl bg-secondbg p-2.5"><Icon size={18} /></div>
            </div>
            <p className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-[#16834b]">
              <TrendingUp size={13} />{c}<span className="font-normal text-second">vs last month</span>
            </p>
          </AdminCard>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_350px]">
        <AdminCard className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[15px] font-semibold">Sales overview</h2>
              <p className="mt-1 text-[12px] text-second">Revenue performance across the last 12 months</p>
            </div>
            <button className="rounded-xl border border-footer px-3 py-2 text-[10px] font-semibold">Last 12 months</button>
          </div>
          <SalesChart />
        </AdminCard>

        <AdminCard className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[15px] font-semibold">Top products</h2>
              <p className="mt-1 text-[12px] text-second">Best sellers this month</p>
            </div>
            <MoreHorizontal size={18} className="text-second" />
          </div>
          <div className="mt-6 space-y-5">
            {top.map(([name, sold, revenue], i) => (
              <div key={name} className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondbg text-[10px] font-bold">0{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-medium">{name}</p>
                  <p className="mt-0.5 text-[10px] text-second">{sold} sold</p>
                </div>
                <b className="text-[11px]">{revenue}</b>
              </div>
            ))}
          </div>
          <Link href="/admin/products" className="mt-7 inline-flex items-center gap-1 text-[10px] font-semibold text-red">
            View product report <ArrowUpRight size={13} />
          </Link>
        </AdminCard>
      </div>

      <AdminCard className="mt-5 overflow-hidden">
        <div className="flex items-center justify-between border-b border-footer px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-[15px] font-semibold">Recent orders</h2>
            <p className="mt-1 text-[12px] text-second">Keep track of your latest orders</p>
          </div>
          <Link href="/admin/orders" className="text-[11px] font-semibold text-red">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead className="bg-secondbg text-[10px] uppercase tracking-[.12em] text-second">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-footer">
              {orders.map((o) => (
                <tr key={o[0]} className="hover:bg-secondbg">
                  <td className="px-6 py-4 text-[12px] font-semibold">{o[0]}</td>
                  <td className="px-6 py-4 text-[12px]">{o[1]}</td>
                  <td className="px-6 py-4 text-[12px] text-second">{o[2]}</td>
                  <td className="px-6 py-4 text-[12px] font-semibold">{o[3]}</td>
                  <td className="px-6 py-4">
                    <AdminStatus type={o[4] === "Delivered" ? "green" : o[4] === "Shipped" ? "blue" : "orange"}>{o[4]}</AdminStatus>
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
