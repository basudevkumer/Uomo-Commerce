import "./globals.css";
import SiteChrome from "@/components/common/SiteChrome";
import Providers from "@/providers/QueryProvider";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import ModalWrapper from "@/components/common/ModalWrapper";
import SmoothScroll from "@/components/common/SmoothScroll";
import AuthBootstrap from "@/features/auth/components/AuthBootstrap";

export const metadata = {
  title: { default: "Uomo — Premium Fashion Store", template: "%s | Uomo" },
  description: "Discover the latest in premium fashion at Uomo. Shop men's and women's clothing, accessories, and more.",
  keywords: ["fashion", "clothing", "men", "women", "premium", "uomo", "ecommerce"],
  authors: [{ name: "Uomo" }],
  creator: "Uomo",
  metadataBase: new URL("https://uomo.com"),
  openGraph: {
    type: "website", locale: "en_US", url: "https://uomo.com", siteName: "Uomo",
    title: "Uomo — Premium Fashion Store",
    description: "Discover the latest in premium fashion at Uomo.",
    images: [{ url: "/assets/images/bannerBg.png", width: 1200, height: 630, alt: "Uomo — Premium Fashion Store" }],
  },
  twitter: {
    card: "summary_large_image", title: "Uomo — Premium Fashion Store",
    description: "Discover the latest in premium fashion at Uomo.",
    images: ["/assets/images/bannerBg.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
        <AuthBootstrap />
          <SmoothScroll>
          <SiteChrome>
            <ErrorBoundary>
              <main>{children}</main>
            </ErrorBoundary>
          </SiteChrome>
          <ModalWrapper />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
