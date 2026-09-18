"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Card, PageIntro } from "../ui/DashboardPrimitives";
import useCartStore from "@/store/cartSlice";

export default function DashboardWishlist() {
  const [toast, setToast] = useState("");
  const { wishlistItems, removeFromWishlist, addToCart } = useCartStore();

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    setToast(`${item.name} added to cart ✓`);
    window.setTimeout(() => setToast(""), 3000);
  };

  return (
    <div>
      {toast && (
        <div
          role="status"
          className="pointer-events-none fixed bottom-6 left-1/2 z-[99999] -translate-x-1/2 rounded-lg bg-head px-6 py-3 text-sm font-medium text-white shadow-2xl"
        >
          {toast}
        </div>
      )}
      <PageIntro
        eyebrow="My account / Wishlist"
        title="Wishlist"
        description="Pieces you have saved for later."
      />

      {wishlistItems.length === 0 ? (
        <Card className="px-6 py-16 text-center">
          <Heart className="mx-auto text-second" size={34} />
          <h2 className="mt-4 text-[20px] font-semibold text-head">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-[13px] text-second">
            Tap the heart on a product to save it here.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex bg-head px-5 py-3 text-[12px] font-semibold text-white hover:bg-red"
          >
            BROWSE PRODUCTS
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <Link href={`/shop/${item.id}`} className="block">
                <div className="aspect-[0.82] overflow-hidden bg-secondbg">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-second">
                      No image
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[10px] uppercase tracking-[0.12em] text-second">
                      {item.category || "Product"}
                    </p>
                    <h2 className="mt-1 truncate text-[13px] font-medium text-head">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-[12px] font-semibold text-head">
                      ${item.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondbg text-red hover:bg-red hover:text-white"
                  >
                    <Heart size={15} fill="currentColor" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleAddToCart(item);
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-footer py-2.5 text-[11px] font-semibold text-head hover:bg-head hover:text-white"
                >
                  <ShoppingBag size={14} />
                  ADD TO CART
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
