"use client";
import { MapPin, Plus, Pencil } from "lucide-react";
import { Card, PageIntro } from "../ui/DashboardPrimitives";
const addresses = [
  {
    title: "Billing address",
    name: "Daniel Robinson",
    line1: "1418 River Drive, Suite 35",
    line2: "Cottonhall, CA 9622",
    country: "United States",
    phone: "+1 246-345-0695",
    default: true,
  },
  {
    title: "Shipping address",
    name: "Daniel Robinson",
    line1: "1418 River Drive, Suite 35",
    line2: "Cottonhall, CA 9622",
    country: "United States",
    phone: "+1 246-345-0695",
  },
];
export default function DashboardAddress() {
  return (
    <div>
      <PageIntro
        eyebrow="My account / Addresses"
        title="Addresses"
        description="Manage the billing and shipping addresses used during checkout."
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-head px-4 py-2.5 text-[11px] font-semibold text-white">
            <Plus size={14} /> Add address
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {addresses.map((a) => (
          <Card key={a.title} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-secondbg p-2.5">
                  <MapPin size={17} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.13em]">
                    {a.title}
                  </p>
                  {a.default && (
                    <span className="mt-1 inline-block text-[9px] font-semibold text-red">
                      DEFAULT
                    </span>
                  )}
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-second hover:text-head">
                <Pencil size={13} /> Edit
              </button>
            </div>
            <div className="mt-7 space-y-1 text-[12px] leading-5 text-second">
              <p className="font-semibold text-head">{a.name}</p>
              <p>{a.line1}</p>
              <p>{a.line2}</p>
              <p>{a.country}</p>
              <p className="pt-2">{a.phone}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
