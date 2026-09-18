"use client";
import { Download, FileText } from "lucide-react";
import { Card, PageIntro } from "../ui/DashboardPrimitives";

const downloads = [
  {
    id: 1,
    product: "Colorful Jacket - Size M",
    date: "Oct 27, 2025",
    expires: "Never",
    file: "colorful-jacket-guide.pdf",
  },
  {
    id: 2,
    product: "Shirt in botanical cheetah print",
    date: "Nov 12, 2025",
    expires: "Dec 31, 2026",
    file: "botanical-shirt-manual.pdf",
  },
  {
    id: 3,
    product: "Cotton jersey t-shirt",
    date: "Jan 5, 2026",
    expires: "Never",
    file: "cotton-tshirt-care.pdf",
  },
];

export default function DashboardDownload() {
  return (
    <div>
      <PageIntro
        eyebrow="My account / Downloads"
        title="Downloads"
        description="Care guides and manuals attached to items you've purchased."
      />

      <Card className="overflow-hidden">
        <div className="border-b border-footer px-5 py-5 sm:px-6">
          <h2 className="text-[15px] font-semibold">Available files</h2>
          <p className="mt-1 text-[12px] text-second">
            {downloads.length} files linked to your orders
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[680px] text-left">
            <thead className="bg-secondbg text-[10px] uppercase tracking-[0.12em] text-second">
              <tr>
                <th className="px-6 py-3 font-semibold">Product</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Expires</th>
                <th className="px-6 py-3 font-semibold">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-footer">
              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-secondbg/40">
                  <td className="px-6 py-5 text-[12px] font-medium">
                    <span className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondbg">
                        <FileText size={16} />
                      </span>
                      {item.product}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[12px] text-second">
                    {item.date}
                  </td>
                  <td className="px-6 py-5 text-[12px] text-second">
                    {item.expires}
                  </td>
                  <td className="px-6 py-5">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-head px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-black">
                      <Download size={13} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 p-4 md:hidden">
          {downloads.map((item) => (
            <div key={item.id} className="rounded-2xl border border-footer p-4">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondbg">
                  <FileText size={16} />
                </span>
                <p className="text-[13px] font-semibold">{item.product}</p>
              </div>
              <p className="mt-3 text-[11px] text-second">Date: {item.date}</p>
              <p className="mt-1 text-[11px] text-second">
                Expires: {item.expires}
              </p>
              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-head py-2.5 text-[11px] font-semibold text-white hover:bg-black">
                <Download size={13} /> Download
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
