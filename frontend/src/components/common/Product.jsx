"use client";
import React, { useState } from "react";
import Images from "./Images";
import { FaHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartSlice";
import useAuthStore, { useLoginModalStore } from "@/store/authSlice";

const Product = ({
  id,
  imgSrc,
  imgAlt,
  catagory,
  itemName,
  itemPrice,
  discountPrice,
}) => {
  const [added, setAdded] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useCartStore();
  const { user, accessToken } = useAuthStore();
  const { openLoginModal } = useLoginModalStore();
  const isLiked = wishlistItems.some((item) => item.id === id);
  const router = useRouter();

  // Add product to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user && !accessToken) {
      openLoginModal();
      return;
    }
    addToCart({
      id,
      name: itemName,
      price: discountPrice ? Number(discountPrice) : Number(itemPrice),
      image: imgSrc,
      category: catagory,
      quantity: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  // Toggle wishlist item
  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      openLoginModal();
      return;
    } //login jokhn thakbe na
    if (isLiked) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name: itemName,
        price: discountPrice ? Number(discountPrice) : Number(itemPrice),
        image: imgSrc,
        category: catagory,
      });
    }
  };

  return (
    <>
      {added && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[9999] rounded-lg bg-head px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          Product added to cart ✓
        </div>
      )}
      <div
        className="group relative flex h-full w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-sm shadow-sm transition-all duration-300 hover:shadow-md"
        onClick={() => router.push(`/shop/${id}`)}
      >
        <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#F5F5F5]">
          <Images
            className={"w-full h-full object-contain"}
            imgSrc={imgSrc}
            imgAlt={imgAlt}
          />

          {/* Add to cart button — visible on hover */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="texts_14_medium text-white bg-black w-full pt-4 pb-2.5 text-center absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0 opacity-100 sm:translate-y-full sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 ease-in-out duration-500 whitespace-nowrap cursor-pointer tracking-widest"
          >
            {added ? "ADDED TO CART" : "ADD TO CART"}
          </button>
        </div>

        {/* Product details */}
        <div className="mt-3.5 flex h-36 shrink-0 flex-col p-3">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <p className="texts_14_regular min-w-0 truncate text-second">
              {catagory}
            </p>

            <div onClick={handleWishlist} className="cursor-pointer">
              {isLiked ? (
                <FaHeart className="text-red cursor-pointer" size={20} />
              ) : (
                <FaHeart className="text-second cursor-pointer" size={20} />
              )}
            </div>
          </div>
          <p className="h-12 overflow-hidden texts_16_regular text-head pt-0.5 line-clamp-2">
            {itemName}
          </p>
          <div className="mt-auto flex min-h-6 items-center gap-2">
            {discountPrice ? (
              <>
                <p className="texts_16_regular text-second line-through">
                  ${itemPrice}
                </p>
                <p className="texts_16_regular text-red font-bold">
                  ${discountPrice}
                </p>
              </>
            ) : (
              <p className="texts_16_regular text-head">${itemPrice}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
