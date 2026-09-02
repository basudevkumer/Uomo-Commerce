import dynamic from "next/dynamic";
import Banner from "@/features/home/components/Banner";
import ClientProviders from "@/features/home/components/ClientProviders";

const Collection = dynamic(() => import("@/features/home/components/Collection"));
const Products = dynamic(() => import("@/features/home/components/Products"));
const Countdown = dynamic(() => import("@/features/home/components/Countdown"));
const Feature = dynamic(() => import("@/features/home/components/Feature"));
const LimitedEdition = dynamic(() => import("@/features/home/components/LimitedEdition"));
const Uomo = dynamic(() => import("@/features/home/components/Uomo"));
const Support = dynamic(() => import("@/features/home/components/Support"));

export const metadata = {
  title: "Home | Uomo",
  description: "Uomo - Premium Fashion Store",
};

export default function HomePage() {
  return (
    <>
      <ClientProviders />
      <Banner />
      <Collection />
      <Products />
      <Countdown />
      <Feature />
      <LimitedEdition />
      <Uomo />
      <Support />
    </>
  );
}
