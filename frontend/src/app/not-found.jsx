
"use client";
import React from "react";
import allImages from "@/constants/assets";
import Button from "@/components/common/Button";

export default function NotFound() {
  const { notFoundPage } = allImages;
  return (
    <div
      className="h-screen object-cover flex flex-col items-center justify-center "
      style={{ backgroundImage: `url(${notFoundPage})` }}
    >
      <h1 className="font-bold text-[65px] lg:text-[100px] text-head">OOPS!</h1>
      <p className="pb-3 head_26_regular text-head">Page not found.</p>
      <p className="head_14_regular text-head max-w-119 text-center pb-6">
        Sorry, we couldn't find the page you where looking for. We suggest that
        you return to home page.
      </p>
      <Button
        btnText={"GO BACK"}
        className={"bg-head  text-white py-5 px-17.5  rounded lg:rounded-none lg:px-35"}
      />
    </div>
  );
}
