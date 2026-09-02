import Top from "@/features/shop/components/shopSingle/Top";
import TabsDesc from "@/features/shop/components/shopSingle/Tabs_desc";

export const metadata = {
  title: "Product | Uomo",
  description: "View product details",
};

export default function ShopSinglePage() {
  return (
    <>
      <Top />
      <TabsDesc />
    </>
  );
}
