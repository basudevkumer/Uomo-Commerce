"use client";

import React from "react";
import Image from "next/image";
import { FiAward, FiEdit3, FiStar, FiTag, FiTrendingUp, FiZap } from "react-icons/fi";
import Container from "@/components/common/Container";
import CollectionSlider from "@/components/common/CollectionSlider";

const COLLECTIONS = [
  { title: "Featured Offers", subtitle: "Curated value picks", icon: <FiTag />, skip: 0, direction: "ltr" },
  { title: "Top Rated Edit", subtitle: "Loved by our community", icon: <FiStar />, skip: 20, direction: "rtl" },
  { title: "New Arrivals", subtitle: "Fresh from the collection", icon: <FiTrendingUp />, skip: 40, direction: "ltr" },
  { title: "Bestseller Edit", subtitle: "The pieces everyone wants", icon: <FiAward />, skip: 60, direction: "rtl" },
  { title: "Limited-Time Edit", subtitle: "Special styles, limited run", icon: <FiZap />, skip: 80, direction: "ltr" },
  { title: "Editor's Selection", subtitle: "Handpicked for your wardrobe", icon: <FiEdit3 />, skip: 100, direction: "rtl" },
];

const CollectionComp = () => {
  return (
    <section className="">
      <div className="relative aspect-[3/1] w-full overflow-hidden bg-[#f4f4f4] shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
        <Image
          src="https://res.cloudinary.com/ixgslen6/image/upload/v1789079164/ChatGPT_Image_Sep_11_2026_04_22_27_AM.webp"
          alt="Uomo collection — discover timeless elegance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <Container>
        <div className="space-y-10 pt-12 sm:pt-16 lg:space-y-25 lg:pt-20">
          {COLLECTIONS.map((collection) => (
            <CollectionSlider
              key={collection.title}
              collectionHeading={collection.title}
              collectionSubtitle={collection.subtitle}
              collectionIcon={collection.icon}
              skip={collection.skip}
              direction={collection.direction}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CollectionComp;
