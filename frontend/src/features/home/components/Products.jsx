"use client";
import Product from "@/components/common/Product";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import useAllProduct from "@/features/shop/hooks/useAllProduct";

const Products = () => {
  const [filter, setFilter] = useState("all");
  // Load enough products so a strict tab filter does not return an empty page.
  const { data, isLoading, isError } = useAllProduct(30);

  const filteredProducts = useMemo(() => {
    const products = data?.products || [];
    if (!products.length) return [];

    const byRating = (a, b) => (b.rating || 0) - (a.rating || 0);
    const byIdDescending = (a, b) => (b.id || 0) - (a.id || 0);

    if (filter === "newArrivals") {
      return [...products].sort(byIdDescending).slice(0, 8);
    }

    if (filter === "bestSeller") {
      const inStock = products.filter((product) => (product.stock || 0) > 50);
      return [...(inStock.length ? inStock : products)].sort(byRating).slice(0, 8);
    }

    if (filter === "toprating") {
      const topRated = products.filter((product) => (product.rating || 0) >= 4.5);
      return [...(topRated.length ? topRated : products)].sort(byRating).slice(0, 8);
    }

    return products.slice(0, 8);
  }, [data?.products, filter]);

  const filters = [
    { key: "all", label: "ALL" },
    { key: "newArrivals", label: "NEW ARRIVALS" },
    { key: "bestSeller", label: "BEST SELLER" },
    { key: "toprating", label: "TOP RATING" },
  ];
  if (isError) return <div>Something went wrong</div>;
  return (
    <>
      <section className="mt-9.5 md:mt-15 lg:mt-23.5">
        <Container>
          <div className="heading text-center">
            <h2 className="lg:head_35_regular font-medium text-[26px] text-head">
              OUR TRENDY{" "}
              <span className="lg:head_35_bold font-bold text-[26px] text-head">
                PRODUCTS
              </span>
            </h2>
            <div className="flex flex-wrap justify-center items-center lg:gap-10 gap-4 mt-4 lg:mt-7.75">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`lg:texts_16_medium text-[14px] duration-500 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-head after:transition-all after:duration-400 hover:after:w-[60%] cursor-pointer ${
                    filter === f.key
                      ? "text-head after:w-[60%]"
                      : "text-second hover:text-head"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="mt-5.5 grid lg:grid-cols-4 grid-cols-2 md:gap-7.5 gap-3.5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 h-80 w-full"
                />
              ))}
            </div>
          ) : (
            <div className="mt-5.5 grid lg:grid-cols-4 grid-cols-2 justify-center md:gap-7.5 gap-3.5">
              {filteredProducts.map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  imgSrc={product.thumbnail}
                  imgAlt={product.title}
                  catagory={product.category}
                  itemName={product.title}
                  itemPrice={product.price}
                  discountPrice={
                    product.discountPercentage > 0
                      ? (
                          product.price -
                          (product.price * product.discountPercentage) / 100
                        ).toFixed(2)
                      : null
                  }
                />
              ))}
              {!filteredProducts.length && (
                <p className="col-span-full py-10 text-center text-second">
                  No products found.
                </p>
              )}
            </div>
          )}

          <div className="mt-10.5 text-center">
            <Link href="/shop">
              <Button
                className={"hover:after:w-24"}
                btnText={"SEE ALL PRODUCT"}
              />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Products;
