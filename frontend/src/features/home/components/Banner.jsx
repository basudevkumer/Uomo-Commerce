"use client";
import CldImage from "@/components/common/CloudlessImage";
import React, { useRef, useState } from "react";
import Button from "@/components/common/Button";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const BG_URL =
  "https://res.cloudinary.com/dlqvctrgm/image/upload/q_auto/f_auto/v1775147827/bannerBg_waubaz.png";

const sliderData = [
  {
    id: 1,
    img: "https://res.cloudinary.com/ixgslen6/image/upload/v1789140997/ChatGPT_Image_Sep_11_2026_09_32_32_PM.webp",
    trend: "NEW TREND",
    title: "SUMMER SALE STYLISH",
    highlight: "WOMENS",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/ixgslen6/image/upload/v1789141182/ChatGPT_Image_Sep_11_2026_09_39_03_PM.webp",
    trend: "NEW ARRIVALS",
    title: "ELEVATE YOUR STYLE",
    highlight: "EVERYDAY",
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/ixgslen6/image/upload/v1789141685/ChatGPT_Image_Sep_11_2026_09_47_24_PM.webp",
    trend: "EXCLUSIVE OFFER",
    title: "TIMELESS FASHION",
    highlight: "FOR YOU",
  },
];

const Banner = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className=" overflow-hidden">
      <div className="lg:mx-15 mx-0 relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {sliderData.map((item, idx) => (
            <SwiperSlide key={item.id}>
              <div className="mx-auto max-w-450 w-full bg-no-repeat bg-cover bg-center overflow-hidden relative h-105 sm:h-150 md:h-187.5 lg:h-200">
                {/* Background Image - next/image diye preload */}
                <Image
                  src={BG_URL}
                  alt=""
                  fill
                  priority={idx === 0}
                  quality={75}
                  className="object-cover object-center -z-10"
                  sizes="100vw"
                />

                {/* Same CldImage - mobile + desktop */}
                <div className="absolute z-0 right-0 bottom-0 lg:top-0 lg:bottom-0 h-[95%] lg:h-full w-[60%] sm:w-[65%] lg:w-auto flex items-end lg:items-stretch justify-end">
                  <CldImage
                    src={item.img}
                    width={600}
                    height={800}
                    alt={`banner slide ${idx + 1}`}
                    fetchPriority={idx === 0 ? "high" : "low"}
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    quality="auto"
                    format="auto"
                    sizes="(max-width: 768px) 60vw, (max-width: 1024px) 65vw, 50vw"
                    className="h-full w-auto object-cover object-top"
                  />
                </div>

                {/* Left Content */}
                <div className="container px-4 sm:px-7.5 xl:px-0 h-full relative">
                  <div className="leftContent absolute z-10 bottom-12 sm:bottom-20 lg:bottom-auto lg:top-[50%] lg:-translate-y-[10%] left-4 sm:left-7.5 xl:left-0 w-[52%] sm:w-[50%] lg:w-[45%] text-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 sm:w-10 h-0.5 bg-white"></div>
                      <p className="texts_14_medium text-white text-[10px] sm:text-[12px] lg:text-[14px]">
                        {item.trend}
                      </p>
                    </div>

                    {/* Desktop heading */}
                    <h1 className="head_70_regular pb-2 text-white hidden lg:block">
                      <span className="whitespace-nowrap">
                        {" "}
                        {item.title}
                      </span>
                      <span className="head_70_bold block">{item.highlight}</span>
                    </h1>

                    {/* Mobile heading */}
                    <h1 className="head_70_regular pb-2 text-white block lg:hidden">
                      <span className="whitespace-nowrap"> {item.title}</span>
                      <span className="block whitespace-nowrap">
                        <span className="head_70_bold">{item.highlight}</span>
                      </span>
                    </h1>

                    <Button
                      className={" !text-white after:bg-white hover:after:w-24"}
                      btnText={"DISCOVER MORE"}
                    />

                    {/* Dots */}
                    <div className="mt-6 sm:mt-10 lg:mt-16 flex gap-1">
                      {sliderData.map((_, index) => (
                        <div
                          onClick={() => swiperRef.current?.slideToLoop(index)}
                          key={index}
                          className="group relative flex items-center justify-center p-2 sm:p-3 cursor-pointer"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              activeIndex === index
                                ? "bg-white"
                                : "bg-white/60 group-hover:bg-white"
                            }`}
                          ></div>
                          <div
                            className={`absolute inset-0 border-2 border-white rounded-full transition-all duration-300 ${
                              activeIndex === index
                                ? "scale-100"
                                : "scale-0 group-hover:scale-100"
                            }`}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Social links - left */}
        <div className="absolute top-1/2 -left-10 -translate-y-[50%] hidden lg:block">
          <div className="flex flex-col gap-y-6.25 z-10">
            <Link href="#">
              <FaFacebookF className="text-second" size={15} />
            </Link>
            <Link href="#">
              <FaTwitter className="text-second" size={15} />
            </Link>
            <Link href="#">
              <FaInstagram className="text-second" size={15} />
            </Link>
            <Link href="#">
              <FaPinterest className="text-second" size={15} />
            </Link>
            <Link href="#">
              <p className="texts_14_medium text-second rotate-270 -ml-7.75 mt-6.5">
                FOLLOW US
              </p>
            </Link>
          </div>
        </div>

        {/* Scroll indicator - right */}
        <div className="absolute bottom-5.75 right-0 xl:-right-20 -translate-y-[50%] hidden lg:block">
          <div className="flex space-x-2.5 items-center rotate-270 z-10">
            <div className="w-7.5 h-0.5 bg-head"></div>
            <p className="texts_14_medium text-head">SCROLL</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
