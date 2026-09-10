"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Product from "./Product";
import useAllProduct from "@/features/shop/hooks/useAllProduct";

const CollectionSlider = ({
  collectionHeading,
  collectionSubtitle,
  collectionIcon,
  skip = 0,
  direction = "rtl",
}) => {
  const { data, isLoading, isFetching, isError } = useAllProduct(10, skip);
  const products = data?.products || [];
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const singleSetWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const frameRef = useRef(null);
  const dragXRef = useRef(0);
  const initializedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const applyOffset = useCallback((offset) => {
    const setWidth = singleSetWidthRef.current;
    if (!setWidth || !trackRef.current) return;

    let nextOffset = offset;
    if (direction === "rtl" && nextOffset <= setWidth * -2) nextOffset += setWidth;
    if (direction === "ltr" && nextOffset >= 0) nextOffset -= setWidth;

    offsetRef.current = nextOffset;
    trackRef.current.style.transform = `translate3d(${nextOffset}px, 0, 0)`;
  }, [direction]);

  useEffect(() => {
    initializedRef.current = false;

    const measureTrack = () => {
      if (!trackRef.current || !products.length) return;
      const setWidth = trackRef.current.scrollWidth / 3;
      singleSetWidthRef.current = setWidth;

      if (!initializedRef.current) {
        offsetRef.current = -setWidth;
        initializedRef.current = true;
      }
      applyOffset(offsetRef.current);
    };

    measureTrack();
    const observer = new ResizeObserver(measureTrack);
    if (viewportRef.current) observer.observe(viewportRef.current);

    return () => observer.disconnect();
  }, [applyOffset, products.length]);

  useEffect(() => {
    const speed = 0.045;
    let lastTime = performance.now();

    const animate = (time) => {
      const elapsed = time - lastTime;
      lastTime = time;

      if (!isPaused && !isDragging && singleSetWidthRef.current) {
        const movement = speed * elapsed * (direction === "rtl" ? -1 : 1);
        applyOffset(offsetRef.current + movement);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [applyOffset, direction, isDragging, isPaused, products.length]);

  const moveBy = (distance) => {
    if (!products.length) return;
    applyOffset(offsetRef.current + distance);
  };

  const handlePointerDown = (event) => {
    dragXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const distance = event.clientX - dragXRef.current;
    dragXRef.current = event.clientX;
    applyOffset(offsetRef.current + distance);
  };

  const handlePointerUp = (event) => {
    setIsDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const renderProduct = (product, index) => (
    <div
      key={`${product.id}-${index}`}
      className="flex h-full w-1/2 shrink-0 pr-2 md:w-1/3 md:pr-3 lg:w-1/4 lg:pr-0"
    >
      <Product
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
    </div>
  );

  if (isError) return <p className="texts_14_regular text-second">Unable to load this collection.</p>;

  return (
    <section aria-label={`${collectionHeading} collection`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-3 head_35_bold text-head">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#f7e5e7] text-[#d6001c]" aria-hidden="true">
              {collectionIcon}
            </span>
            {collectionHeading}
          </h2>
          {collectionSubtitle && (
            <p className="mt-1 pl-12 text-[12px] uppercase tracking-[0.14em] text-second">
              {collectionSubtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => moveBy(280)}
            aria-label={`Previous ${collectionHeading} products`}
            className="flex size-9 items-center justify-center rounded-full border border-footer bg-white text-head transition-colors hover:border-head hover:bg-head hover:text-white"
          >
            <GoChevronLeft size={20} />
          </button>
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => moveBy(-280)}
            aria-label={`Next ${collectionHeading} products`}
            className="flex size-9 items-center justify-center rounded-full border border-footer bg-white text-head transition-colors hover:border-head hover:bg-head hover:text-white"
          >
            <GoChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`relative mt-8.5 py-5 overflow-hidden touch-pan-y select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {isLoading || isFetching ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7.5">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="overflow-hidden rounded-sm" aria-hidden="true">
                <div className="aspect-square animate-pulse bg-[#eeeeee]" />
                <div className="space-y-2 px-3 pt-4">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-[#e4e4e4]" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-[#e4e4e4]" />
                  <div className="h-4 w-1/4 animate-pulse rounded bg-[#e4e4e4]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-6 lg:gap-7.5 will-change-transform"
          >
            {[...products, ...products, ...products].map(renderProduct)}
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionSlider;
