import { MoreHorizontal, Package, Plus } from "lucide-react";
import { AdminCard, AdminPageIntro, AdminStatus } from "@/features/admin/components/AdminShell";

const products = [
  ["Leather tote bag", "Accessories", "$128.00", "428", "In stock"],
  ["Everyday sneakers", "Footwear", "$156.00", "312", "In stock"],
  ["Classic cotton shirt", "Shirts", "$84.00", "289", "Low stock"],
  ["Wool overshirt", "Outerwear", "$112.00", "198", "In stock"],
  ["Relaxed linen trousers", "Trousers", "$96.00", "76", "Low stock"],
];

export const metadata = { title: "Products | Uomo Admin" };

export default function AdminProductsPage() {
  return (
    <div>
      <AdminPageIntro eyebrow="Workspace / Products" title="Products" description="Manage your catalogue, inventory and product availability." action={<button className="inline-flex items-center gap-2 rounded-xl bg-head px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-black"><Plus size={14} /> Add product</button>} />
      <AdminCard className="overflow-hidden"><div className="flex items-center justify-between border-b border-footer px-5 py-4 sm:px-6"><div><p className="text-[12px] font-semibold">{products.length} products</p><p className="mt-1 text-[11px] text-second">Static catalogue preview</p></div><MoreHorizontal size={18} className="text-second" /></div><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left"><thead className="bg-secondbg text-[10px] uppercase tracking-[.12em] text-second"><tr><th className="px-6 py-3">Product</th><th className="px-6 py-3">Category</th><th className="px-6 py-3">Price</th><th className="px-6 py-3">Sold</th><th className="px-6 py-3">Inventory</th><th /></tr></thead><tbody className="divide-y divide-footer">{products.map(([name, category, price, sold, inventory]) => <tr key={name} className="hover:bg-secondbg"><td className="px-6 py-5"><span className="flex items-center gap-3 text-[12px] font-semibold"><span className="flex size-9 items-center justify-center rounded-xl bg-secondbg"><Package size={16} /></span>{name}</span></td><td className="px-6 py-5 text-[12px] text-second">{category}</td><td className="px-6 py-5 text-[12px] font-semibold">{price}</td><td className="px-6 py-5 text-[12px] text-second">{sold}</td><td className="px-6 py-5"><AdminStatus type={inventory === "In stock" ? "green" : "orange"}>{inventory}</AdminStatus></td><td className="px-6 py-5"><button aria-label={`More options for ${name}`} className="rounded-lg p-2 text-second hover:bg-secondbg"><MoreHorizontal size={15} /></button></td></tr>)}</tbody></table></div></AdminCard>
    </div>
  );
}
