"use client";
import React from "react";
import Link from "next/link";
import { FiArrowUpRight, FiHeadphones, FiPlay, FiShield, FiTruck } from "react-icons/fi";
import CldImage from "@/components/common/CloudlessImage";
import Container from "@/components/common/Container";

const features = [
  {
    icon: FiTruck,
    title: "FAST AND FREE DELIVERY",
    desc: "Free delivery for all orders over $140",
  },
  {
    icon: FiHeadphones,
    title: "24/7 CUSTOMER SUPPORT",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: FiShield,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
];

const brands = [
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=320&h=120&q=80",
    alt: "Mango",
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=320&h=120&q=80",
    alt: "Zara",
  },
  {
    src: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=320&h=120&q=80",
    alt: "Reebok",
  },
  {
    src: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=320&h=120&q=80",
    alt: "ASOS",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=320&h=120&q=80",
    alt: "Stradivarius",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=320&h=120&q=80",
    alt: "Adidas",
  },
  {
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=320&h=120&q=80",
    alt: "Bershka",
  },
];

const About = () => {
  return (
    <section className="">
      <div >
        <Container>
          {/* Page Title */}
          {/* <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 xl:ml-60.5 mb-5 sm:mb-6 lg:mb-7 xl:mb-8">
            <h1 className="head_35_bold text-2xl sm:text-3xl lg:text-[30px] xl:text-[35px]">
              ABOUT UOMO
            </h1>
          </div> */}
        </Container>

        {/* Full-width banner intentionally sits outside Container */}
        <div className="relative left-1/2 w-screen max-h-[420px] -translate-x-1/2 overflow-hidden bg-[#d0d0d0] sm:max-h-[500px] lg:max-h-[560px]">
          <CldImage
            src="https://res.cloudinary.com/ixgslen6/image/upload/v1789083603/ChatGPT_Image_Sep_11_2026_05_39_13_AM.webp"
            alt="Uomo fashion collection"
            width={1400}
            height={600}
            quality="auto"
            format="auto"
            className="h-45 w-full object-cover object-center sm:h-60 md:h-75 lg:h-90 xl:h-105"
          />
        </div>

        <Container>
          {/* Our Story */}
          <div className="mx-auto mt-6 max-w-132.25 sm:mt-8 lg:mt-10 xl:mt-12.5 mb-5 lg:mb-6 xl:mb-7.25">
            <h2 className="head_26_medium text-xl sm:text-2xl lg:text-[24px] xl:text-[26px] mb-3 lg:mb-3.5 xl:mb-3.75">
              OUR STORY
            </h2>
            <p className="texts_16_medium text-sm sm:text-base lg:text-[15px] xl:text-[16px] leading-7 mb-4 lg:mb-5 xl:mb-5 tracking-[0%]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p className="texts_14_regular text-sm leading-7 mb-5 lg:mb-6 xl:mb-8.25">
              Saw wherein fruitful good days image them, midst, waters upon,
              saw. Seas lights seasons. Fourth hath rule Evening Creepeth own
              lesser years itself so seed fifth for grass evening fourth shall
              you&apos;re unto that. Had. Female replenish for yielding so saw all
              one to yielding grass you&apos;ll air sea it, open waters subdue, hath.
              Brought second Made. Be. Under male male, firmament, beast had
              light after fifth forth darkness thing hath sixth rule night
              multiply him life give they&apos;re great.
            </p>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 xl:gap-10">
              <div>
                <h3 className="texts_16_medium text-sm sm:text-base leading-[100%] mb-3 lg:mb-3.5 xl:mb-4">
                  Our Mission
                </h3>
                <p className="texts_14_regular text-sm">
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
              <div>
                <h3 className="texts_16_medium text-sm sm:text-base leading-[100%] mb-3 lg:mb-3.5 xl:mb-4">
                  Our Vision
                </h3>
                <p className="texts_14_regular text-sm">
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
            </div>
          </div>

          {/* Mid Section - Image + Company Text */}
          <div className="mx-auto w-full max-w-292.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-11.25 items-center mt-6 sm:mt-8 lg:mt-10 xl:mt-0 mb-8 sm:mb-10 lg:mb-16 xl:mb-25">
              {/* Mid Image */}
              <div className="w-full bg-[#d0d0d0] overflow-hidden relative rounded-sm">
                <CldImage
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85"
                  alt="Uomo seasonal fashion edit"
                  width={600}
                  height={700}
                  quality="auto"
                  format="auto"
                  className="w-full h-55 sm:h-75 md:h-95 lg:h-110 xl:h-full object-cover"
                />
              </div>

              {/* Company Text */}
              <div>
                <h3 className="text-[13px] sm:text-[15px] lg:text-[15px] xl:text-[16px] font-medium tracking-[0%] text-[rgb(118,118,118)] mb-3 lg:mb-3.5 xl:mb-4">
                  THE COMPANY
                </h3>
                <p className="texts_14_regular text-sm leading-7 mb-4 sm:mb-5 lg:mb-7 xl:mb-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                  sapien dignissim a elementum. Sociis metus, hendrerit mauris
                  id in. Quis sit sit ultrices tincidunt euismod luctus diam.
                  Turpis sodales orci etiam phasellus lacus id leo. Amet turpis
                  nunc, nulla massa est viverra interdum. Praesent auctor nulla
                  morbi non posuere mattis. Arcu eu id maecenas cras.
                </p>
                <p className="texts_14_regular text-sm leading-7">
                  Nibh euismod donec elit posuere lobortis consequat faucibus
                  aliquam metus. Ornare consequat, vulputate sit maecenas mauris
                  urna sed fringilla. Urna fermentum iaculis pharetra, maecenas
                  dui nullam nullam rhoncus.
                </p>
              </div>
            </div>

            {/* Brand film */}
            <div className="mb-8 grid items-center gap-8 sm:mb-10 md:grid-cols-[1.15fr_0.85fr] lg:mb-16 xl:mb-25">
              <Link
                href="/about/video"
                className="group relative block aspect-video overflow-hidden rounded-sm bg-[#e9e5e1]"
                aria-label="Watch the Uomo brand film"
              >
                <CldImage
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85"
                  alt="Uomo brand film preview"
                  width={1400}
                  height={800}
                  quality="auto"
                  format="auto"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25" />
                <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-head shadow-lg transition duration-300 group-hover:scale-110">
                  <FiPlay size={22} fill="currentColor" aria-hidden="true" />
                </span>
              </Link>
              <div className="max-w-xl">
                <p className="texts_14_medium uppercase tracking-[0.2em] text-red">
                  UOMO / IN MOTION
                </p>
                <h2 className="mt-3 head_35_bold text-head">
                  Designed for the way you move.
                </h2>
                <p className="mt-4 texts_16_regular leading-7 text-second">
                  Step into the world of Uomo through our latest brand film—an
                  edit of considered pieces, modern tailoring and everyday
                  confidence.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 texts_14_medium text-head underline decoration-1 underline-offset-4">
                  WATCH THE FILM <FiArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8 sm:gap-6 lg:gap-10 xl:gap-36 items-start mb-8 sm:mb-10 lg:mb-16 xl:mb-25">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 sm:gap-4 xl:gap-4.5"
                >
                  <div className="flex size-11.25 shrink-0 items-center justify-center rounded-full bg-[#f7e5e7] text-red">
                    <feature.icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] text-[#141F46] font-medium tracking-[0%] block mb-1">
                      {feature.title}
                    </p>
                    <span className="text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px] text-second font-normal tracking-[0%]">
                      {feature.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Logos */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3 md:grid-cols-7 md:gap-5 lg:gap-6 xl:flex xl:items-center xl:justify-between">
            {brands.map((brand, i) => (
              <div key={brand.alt} className="group relative flex h-16 items-center justify-center overflow-hidden rounded-sm bg-[#f7f7f7]">
                <CldImage
                  src={brand.src}
                  alt={brand.alt}
                  width={320}
                  height={120}
                  quality="auto"
                  format="auto"
                  className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute inset-x-0 bottom-0 bg-black/55 px-2 py-1 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                  {brand.alt}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default About;
