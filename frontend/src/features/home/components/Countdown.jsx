"use client";
import CldImage from "@/components/common/CloudlessImage";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { zeroPad } from "react-countdown";

const ReactCountdown = dynamic(() => import("react-countdown"), { ssr: false });

const Countdown = () => {
  return (
    <>
      <section className="mt-13 overflow-hidden bg-[#EBEBEB] lg:mt-25">
        <div
          className="bg-no-repeat bg-cover bg-center py-12 sm:py-16 lg:mx-15 lg:py-18"
        >
          <Container>
            {/* Main div */}
            <div className="flex h-full flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-20">

              {/* Text Div — max-w-[699px] */}
              <div className="w-full max-w-174.75">
                <div className="pb-8 sm:pb-12 lg:pb-25">
                  <div className="flex items-center gap-3.25">
                    <div className="h-0.5 w-10 bg-second-red"></div>
                    <p className="texts_14_medium text-second-red">
                      DEAL OF THE WEEK
                    </p>
                  </div>
                  <h2 className="head_70_regular font-medium text-head pt-2.25 pb-2.75  uppercase">
                    <span className="head_70_bold font-bold text-head">
                      Spring
                    </span>{" "}
                    Collection
                  </h2>
                  <Link href={"/shop"}>
                    <Button className={"hover:after:w-12.5"} btnText={"SHOP NOW"} />
                  </Link>
                </div>

                {/* Countdown Part Start */}
                <ReactCountdown
                  date={new Date("2027-03-30T00:00:00")}
                  renderer={({ days, hours, minutes, seconds }) => (
                    <div className="flex flex-wrap items-start gap-x-3 gap-y-2 sm:gap-x-5">
                      <div>
                        <p className="font-jost font-normal lg:text-[30px] text-[18px] text-head leading-7.5">
                          {zeroPad(days)}
                        </p>
                        <span className="font-jost font-bold lg:text-base text-[14px] text-second leading-7.5">
                          DAYS
                        </span>
                      </div>
                      <div>
                        <span className="font-jost font-normal lg:text-[30px] text-[18px] text-head leading-7.5">
                          :
                        </span>
                      </div>
                      <div>
                        <p className="font-jost font-normal lg:text-[30px] text-[18px] text-head leading-7.5">
                          {zeroPad(hours)}
                        </p>
                        <span className="font-jost font-bold lg:text-base text-[14px] text-second leading-7.5">
                          HOURS
                        </span>
                      </div>
                      <div>
                        <span className="font-jost font-normal lg:text-[30px] text-[18px] text-head leading-7.5">
                          :
                        </span>
                      </div>
                      <div>
                        <p className="font-jost font-normal lg:text-[30px] text-[18px] text-head leading-7.5">
                          {zeroPad(minutes)}
                        </p>
                        <span className="font-jost font-bold lg:text-base text-[14px] text-second leading-7.5">
                          MINS
                        </span>
                      </div>
                      <div>
                        <span className="font-jost font-normal text-[30px] text-head leading-7.5">
                          :
                        </span>
                      </div>
                      <div>
                        <p className="font-jost font-normal lg:text-[30px] text-[18px] text-head leading-7.5">
                          {zeroPad(seconds)}
                        </p>
                        <span className="font-jost font-bold lg:text-base text-[14px] text-second leading-7.5">
                          SEC
                        </span>
                      </div>
                    </div>
                  )}
                />
                {/* Countdown Part End */}
              </div>

              {/* Image Div — w-[426px] */}
              <div className="relative aspect-[4/5] w-full md:max-w-[426px] md:aspect-[3/4] md:w-[38%] lg:w-106.5 lg:min-w-105.5">
                <CldImage
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"
                  alt="Spring fashion collection"
                  width={426}
                  height={600}
                  priority
                  className="h-full w-full object-cover object-center"
                />
              </div>

            </div>
          </Container>
        </div>
      </section>
    </>
  );
};

export default Countdown;
