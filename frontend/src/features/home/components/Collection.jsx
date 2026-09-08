import React from "react";
import Link from "next/link";
import Container from "@/components/common/Container";

const IMAGES = {
  women:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  men: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85",
  kids: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85",
};

const ShopLink = ({ children }) => (
  <span className="relative mt-2 inline-block text-[9px] font-medium uppercase leading-none tracking-wide text-[#222] after:absolute  after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-white/80 sm:mt-3 sm:text-[11px] text-white/80">
    {children}
  </span>
);

const Copy = ({ eyebrow, children, className = "" }) => (
  <div className={`z-10 text-[#222] ${className}`}>
    {eyebrow && (
      <p className="mb-1 text-[8px] font-normal uppercase leading-none sm:text-[10px]">
        {eyebrow}
      </p>
    )}
    <h3 className="text-[18px] font-normal uppercase leading-none sm:text-[22px]">
      {children}
    </h3>
  </div>
);

const Collection = () => (
  <section className="mt-10 bg-white px-4 sm:mt-16 lg:mt-25 lg:px-0">
    <Container>
      <div className="grid grid-cols-1 gap-5 sm:gap-[30px] lg:h-[600px] lg:grid-cols-2 lg:gap-[30px]">
        {/* Women collection */}
        <Link
          href="/shop?category=womens-dresses"
          className="group relative block h-[370px] overflow-hidden bg-[#eef0f2] sm:h-[560px] lg:h-full"
        >
          <img
            src={IMAGES.women}
            alt="Women collection"
            className="absolute inset-0 h-full w-full object-cover object-[center_28%] transition-transform duration-700 group-hover:scale-105"
          />
          <Copy
            eyebrow="Hot list"
            className="absolute text-white/80 bottom-5 left-5 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10"
          >
            <span className="font-bold">Women</span> Collection
            <span className="block ">
              <ShopLink>Shop now</ShopLink>
            </span>
          </Copy>
        </Link>

        {/* Men + Kids + Gift cards */}
        <div className="flex flex-col gap-5 sm:gap-[30px] lg:h-full lg:gap-[30px]">
          <Link
            href="/shop?category=mens-shirts"
            className="group relative block h-[240px] overflow-hidden bg-[#e7e4df] sm:h-[280px] lg:h-[270px]"
          >
            <img
              src={IMAGES.men}
              alt="Men collection"
              className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
            />
            <Copy className=" text-white/80 absolute left-5 top-1/2 -translate-y-1/2 sm:left-8 lg:left-10">
              <span className="mb-2 block text-[8px] font-normal sm:text-[10px]">
                HOT LIST
              </span>
              <span className="font-bold">Men</span> Collection
              <span className="block">
                <ShopLink>Shop now</ShopLink>
              </span>
            </Copy>
          </Link>

          <div className="grid h-auto grid-cols-1 gap-5 sm:h-[300px] sm:grid-cols-2 sm:gap-[30px] lg:h-[300px]">
            <Link
              href="/shop?category=tops"
              className="group relative block min-h-[260px] overflow-hidden bg-[#eeeae6] sm:min-h-0"
            >
              <img
                src={IMAGES.kids}
                alt="Kids collection"
                className="absolute inset-0 h-full w-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
              />
              <Copy className=" text-white/80 absolute bottom-5 left-5 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10">
                <span className="mb-2 block text-[8px] font-normal sm:text-[10px]">
                  HOT LIST
                </span>
                <span className="font-bold">Kids</span> Collection
                <span className="block">
                  <ShopLink>Shop now</ShopLink>
                </span>
              </Copy>
            </Link>

            <Link
              href="/shop?category=gift-cards"
              className="relative block min-h-[260px] overflow-hidden bg-[#f5e9e4] sm:min-h-0"
            >
              <Copy className="absolute left-5 top-1/2 max-w-[220px] -translate-y-1/2 sm:left-8 lg:left-10">
                <span className="font-bold">E-gift</span> Cards
                <p className="mt-3 max-w-[190px] text-[9px] normal-case leading-[1.45] sm:text-[11px]">
                  Surprise someone with the gift they really want.
                </p>
                <span className="block">
                  <ShopLink>Discover more</ShopLink>
                </span>
              </Copy>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default Collection;
