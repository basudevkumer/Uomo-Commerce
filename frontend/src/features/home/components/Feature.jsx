"use client";

import Container from "@/components/common/Container";
import React from "react";
import FeaturedProducts from "@/components/common/FeaturedProducts";

const Feature = () => {
  return (
    <section className="mt-4 lg:mt-25">
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7.5">
          <FeaturedProducts
            imgSrc="https://res.cloudinary.com/ta5widnb/image/upload/v1788896106/Gemini_Generated_Image_b101sjb101sjb101.avif"
            imgAlt="Men's Sweaters"
            price="STARTING AT $39"
            category="Men's Sweaters"
          />
          <FeaturedProducts
            imgSrc="https://res.cloudinary.com/ta5widnb/image/upload/v1788896556/image.avif"
            imgAlt="Men's T-Shirts"
            price="STARTING AT $19"
            category="Men's T-Shirts"
          />
        </div>
      </Container>
    </section>
  );
};

export default Feature;
