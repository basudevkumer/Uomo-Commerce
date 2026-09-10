"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Container from "@/components/common/Container";
import { shopList1 } from "@/data/projectData";
import allIcons from "@/constants/icons";
import Product from "@/components/common/Product";
import { Progress } from "@/components/ui/progress";
import Button from "@/components/common/Button";
import ShopFilter from "./ShopFilter";
import ShopProductSkeleton from "./ShopProductSkeleton";
import useAllProduct from "@/features/shop/hooks/useAllProduct";
import { ChevronDown } from "lucide-react";

// Category display name map
const CATEGORY_LABEL = {
  "womens-dresses": "WOMEN",
  "mens-shirts": "MEN",
  tops: "KIDS",
};

// Stable direct image URL for the outerwear collection banner.
// A Pinterest pin page URL cannot be rendered as an <img> source.
const COLLECTION_BANNER_IMAGES = {
  default:
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=85",
  "womens-dresses":
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
  "mens-shirts":
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
};

const SORT_OPTIONS = [
  ["default", "Default Sorting"],
  ["popularity", "Popularity"],
  ["rating", "Average Rating"],
  ["latest", "Latest"],
  ["price-low", "Price: Low to High"],
  ["price-high", "Price: High to Low"],
];

const ShopBannerInner = () => {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "";

  const [skip, setSkip] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activePaginationAction, setActivePaginationAction] = useState(null);
  const [cols, setCols] = useState(4);
  const [sortBy, setSortBy] = useState("default");
  const sortRef = useRef(null);
  const limit = 16;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // URL category বদলালে skip reset করো
  useEffect(() => {
    setSkip(0);
  }, [urlCategory]);

  const { data, isLoading, isFetching, isError } = useAllProduct(limit, skip, "", urlCategory);
  const rawProducts = data?.products || [];

  const products = [...rawProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "latest") return b.id - a.id;
    return 0;
  });

  const total = data?.total || 0;
  const visibleCount = skip + products.length;
  const percentage = total > 0 ? (visibleCount / total) * 100 : 0;
  const bannerImage =
    COLLECTION_BANNER_IMAGES[urlCategory] || COLLECTION_BANNER_IMAGES.default;

  const handleLoadMore = () => {
    setActivePaginationAction("next");
    setSkip((prev) => prev + limit);
  };

  const handleLoadPrevious = () => {
    setActivePaginationAction("previous");
    setSkip((prev) => Math.max(0, prev - limit));
  };

  if (isError) return <div>Something went wrong.</div>;

  const { filter } = allIcons;

  const categoryLabel = CATEGORY_LABEL[urlCategory];

  return (
    <section>
      {/* Banner */}
      <div className="bg-[url('/assets/images/ShopBannerBg.png')] bg-[#f1f1f1] py-10 sm:py-20 md:py-33.75 mx-4 sm:mx-8 md:mx-15 bg-no-repeat bg-cover bg-center relative overflow-hidden pt-10 sm:pt-14 md:pt-18.75">
        {bannerImage && (
          <div className="pointer-events-none absolute inset-y-0 right-0 z-0 flex w-[44%] items-end justify-end sm:w-[40%] md:w-[35%]">
            <img
              src={bannerImage}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center mix-blend-multiply sm:h-[115%] sm:object-contain sm:object-right-bottom"
            />
          </div>
        )}
        <Container>
          <div className="relative z-10 max-w-[75%] sm:max-w-[70%] md:max-w-[68%]">
            <h3
              className="font-bold text-[clamp(2.5rem,8vw,5.625rem)] uppercase leading-[0.9] tracking-[0.04em] text-transparent bg-transparent"
              style={{
                WebkitTextStroke: "1.5px rgba(95, 95, 95, 0.68)",
                textShadow: "0 1px 0 rgba(255, 255, 255, 0.5)",
              }}
            >
              {categoryLabel ? `${categoryLabel} COLLECTION` : "Jackets & Coats"}
            </h3>
          </div>
          <div className="relative z-10 pt-3.5 overflow-x-auto">
            <ul className="flex items-center gap-x-4 sm:gap-x-6 md:gap-x-10 whitespace-nowrap">
              {shopList1.map((items) => (
                <li key={items.id}>
                  <button className="texts_16_medium cursor-pointer text-head relative after:absolute after:content-[''] after:w-0 after:h-0.5 after:bg-head after:bottom-[2.5px] after:left-0 after:transition-all after:duration-500 after:ease-in-out [&:hover::after]:w-[60%] py-1">
                    {items.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="mt-6 sm:mt-9 mb-10 sm:mb-16 md:mb-25">
        <Container>
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] sm:text-[14px]">
              <Link
                href="/"
                className="font-medium text-second transition-colors hover:text-[#d6001c]"
              >
                Home
              </Link>
              <span aria-hidden="true" className="text-[#b9a16b]">/</span>
              <span className="font-semibold text-head">The Shop</span>
              {categoryLabel && (
                <>
                  <span aria-hidden="true" className="text-[#b9a16b]">/</span>
                  <span className="font-medium text-second">{categoryLabel}</span>
                </>
              )}
            </nav>

            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-7.5 gap-y-2">
              {/* Sort */}
              <div ref={sortRef} className="relative w-full sm:w-auto sm:min-w-55">
                <label
                  className="pointer-events-none absolute -top-2 left-3 z-10 bg-white px-1 text-[10px] font-medium uppercase tracking-[0.12em] text-second"
                >
                  Sort by
                </label>
                <button
                  type="button"
                  onClick={() => setSortOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                  className="flex h-12 w-full cursor-pointer items-center justify-between rounded-sm border border-footer bg-white px-4 text-left text-head shadow-[0_4px_16px_rgba(0,0,0,0.04)] outline-none transition-colors hover:border-head focus:border-head texts_14_medium"
                >
                  <span>{SORT_OPTIONS.find(([value]) => value === sortBy)?.[1]}</span>
                  <ChevronDown
                    aria-hidden="true"
                    size={17}
                    strokeWidth={1.7}
                    className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {sortOpen && (
                  <div
                    role="listbox"
                    aria-label="Sort products"
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-sm border border-footer bg-white p-1 shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
                  >
                    {SORT_OPTIONS.map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        role="option"
                        aria-selected={sortBy === value}
                        onClick={() => {
                          setSortBy(value);
                          setSortOpen(false);
                        }}
                        className={`block w-full cursor-pointer px-3 py-2 text-left text-[13px] transition-colors hover:bg-[#d6001c] hover:text-white ${
                          sortBy === value ? "bg-[#f7e5e7] font-medium" : "text-head"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-6 w-0.5 bg-gray-300 hidden sm:block"></div>

              {/* View cols */}
              <div className="flex items-center gap-2.5">
                <span className="texts_14_medium mr-1 text-head">VIEW</span>
                {[1, 2, 3, 4].map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setCols(view)}
                    aria-label={"Show " + view + " column" + (view > 1 ? "s" : "")}
                    aria-pressed={cols === view}
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition-all duration-200",
                      view === 3 ? "hidden md:flex" : "",
                      view === 4 ? "hidden lg:flex" : "",
                      cols === view
                        ? "bg-[#d6001c] font-medium text-white shadow-[0_4px_10px_rgba(214,0,28,0.2)]"
                        : "text-head hover:bg-[#f7e5e7] hover:text-[#d6001c]",
                    ].filter(Boolean).join(" ")}
                  >
                    {view}
                  </button>
                ))}
              </div>

              {/* Filter */}
              <button
                onClick={() => setFilterOpen(true)}
                className="border-l-2 pl-4 sm:pl-7.5 border-footer texts_14_medium text-head flex items-center gap-x-2.5 cursor-pointer"
              >
                <span className="text-lg">{filter}</span> FILTER
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div>
            {isLoading ? (
              <ShopProductSkeleton cols={cols} count={16} />
            ) : (
              <div className="relative" aria-busy={isFetching}>
                <div
                  className={`pt-10 pb-12.5 grid gap-4 sm:gap-6 md:gap-7.5
                    ${cols === 1 ? "grid-cols-1" : ""}
                    ${cols === 2 ? "grid-cols-1 sm:grid-cols-2" : ""}
                    ${cols === 3 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : ""}
                    ${cols === 4 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}
                  `}
                >
                  {products.map((product) => (
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
                          ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
                          : null
                      }
                    />
                  ))}
                </div>

                {isFetching && (
                  <div className="pointer-events-none absolute inset-0 z-10 bg-white/70">
                    <ShopProductSkeleton cols={cols} count={Math.max(products.length, 1)} />
                  </div>
                )}
              </div>
            )}

            {/* Load More */}
            <div className="mx-auto flex w-full max-w-75 flex-col items-center uppercase">
              <p className="texts_14_medium pb-2 text-center text-black">
                Showing <span className="font-semibold">{visibleCount}</span> of {total} Items
              </p>
              <Progress
                value={percentage}
                className="w-full items-center rounded-[10px] [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-[#e4e4e4] [&_[data-slot=progress-indicator]]:bg-[#222222]"
              />
              <div className="mt-1 flex flex-col items-center justify-center gap-1.5 lg:w-[420px] lg:max-w-none lg:flex-row lg:gap-x-8">
                {skip > 0 && (
                  <button
                    onClick={handleLoadPrevious}
                    disabled={isFetching}
                    aria-label="Show previous products"
                    className="disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Button
                      className={`texts_14_medium whitespace-nowrap pt-4.25 hover:after:w-22 ${
                        activePaginationAction === "previous"
                          ? "!text-[#d6001c] !after:bg-[#d6001c]"
                          : "text-black"
                      }`}
                      btnText={"PREVIOUS PRODUCTS"}
                    />
                  </button>
                )}

                {visibleCount < total && (
                  <button
                    onClick={handleLoadMore}
                    disabled={isFetching}
                    aria-label="Show more products"
                    aria-busy={isFetching}
                    className="disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Button
                      className={`texts_14_medium whitespace-nowrap pt-4.25 hover:after:w-15 ${
                        activePaginationAction === "next"
                          ? "!text-[#d6001c] !after:bg-[#d6001c]"
                          : "text-black"
                      }`}
                      btnText={"SHOW MORE PRODUCTS"}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>

        <ShopFilter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      </div>
    </section>
  );
};

// useSearchParams এর জন্য Suspense wrapper দরকার Next.js এ
const ShopBanner = () => (
  <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
    <ShopBannerInner />
  </Suspense>
);

export default ShopBanner;
