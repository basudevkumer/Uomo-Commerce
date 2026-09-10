"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navigation/navbar/Navbar";
import Footer from "@/components/common/Footer";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isDashboard = pathname?.startsWith("/dashboard");

  // Admin and customer dashboards own their full-screen shell.
  // Do not wrap them with the public storefront navbar/footer.
  if (isAdmin || isDashboard) return children;

  return (
    <>
      <Navbar />
      {/* Keep public content below the fixed storefront navbar. */}
      <div className="pt-[70px] lg:pt-[85px]">{children}</div>
      <Footer />
    </>
  );
}
