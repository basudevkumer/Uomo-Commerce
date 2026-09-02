import Top from "@/features/shop/components/shopSingle/Top";
import TabsDesc from "@/features/shop/components/shopSingle/Tabs_desc";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 3600 },
    });
    const product = await res.json();
    return {
      title: product?.title || "Product",
      description: product?.description || "View product details",
      openGraph: {
        title: product?.title || "Product",
        description: product?.description || "View product details",
        images: product?.thumbnail ? [{ url: product.thumbnail }] : [],
      },
    };
  } catch {
    return { title: "Product | Uomo" };
  }
}

export default async function ShopProductPage({ params }) {
  const { id } = await params;
  return (
    <>
      <Top id={id} />
      <TabsDesc />
    </>
  );
}
