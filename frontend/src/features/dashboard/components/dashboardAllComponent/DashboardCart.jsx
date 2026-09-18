"use client";

import Link from "next/link";
import useCartStore from "@/store/cartSlice";

export default function DashboardCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <section>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red">
            Shopping
          </p>
          <h1 className="mt-2 text-[30px] font-bold tracking-[-0.045em] text-head sm:text-[36px]">
            My Cart
          </h1>
          <p className="mt-2 text-[13px] text-second">
            {itemCount} {itemCount === 1 ? "item" : "items"} saved in your cart.
          </p>
        </div>
        <Link
          href="/cart"
          className="inline-flex items-center justify-center bg-head px-5 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-red"
        >
          VIEW FULL CART
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-footer bg-white px-6 py-16 text-center">
          <h2 className="text-[20px] font-semibold text-head">Your cart is empty</h2>
          <p className="mt-2 text-[13px] text-second">
            Add products from the shop and they will appear here.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex bg-head px-5 py-3 text-[12px] font-semibold text-white hover:bg-red"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cartItems.map((item) => (
            <Link
              key={item.id}
              href="/cart"
              className="group rounded-2xl border border-footer bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="size-20 rounded-xl bg-secondbg object-cover"
                />
                <div className="min-w-0">
                  <h2 className="truncate text-[14px] font-semibold text-head group-hover:text-red">
                    {item.name || item.title}
                  </h2>
                  <p className="mt-1 text-[12px] text-second">
                    Quantity: {item.quantity}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-head">
                    ${item.price} each
                  </p>
                </div>
              </div>
              <p className="mt-4 border-t border-footer pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-second group-hover:text-red">
                Open cart details →
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
