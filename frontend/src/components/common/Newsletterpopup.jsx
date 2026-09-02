"use client";
import { useState } from "react";
import { saveNewsletterSubscription } from "@/helpers/dummyData";
import useAuthStore from "@/store/authSlice";
import { IoMdClose } from "react-icons/io";
import CldImage from "@/components/common/CloudlessImage";
export default function NewsletterPopup() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isOpen = !user && !isDismissed;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    saveNewsletterSubscription(email);
    setIsDismissed(true);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="lg:block hidden">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-3 sm:px-6 md:px-8">
        <div className="relative flex flex-col md:flex-row w-full max-w-[calc(100vw-24px)] sm:max-w-135 md:max-w-180 lg:max-w-215 xl:max-w-225 shadow-2xl">
          {/* Left — image panel */}
          <div className="hidden md:flex relative md:w-65 lg:w-85 xl:w-100 shrink-0 overflow-hidden md:min-h-112.5 lg:min-h-125 xl:min-h-137.5">
            <CldImage
              src="letterPopup_dp13xv"
              alt="newsletter"
              width={500}
              height={700}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — content panel */}
          <div className="relative flex flex-col justify-center bg-white w-full flex-1 px-5 py-10 sm:px-8 sm:py-12 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
            {/* Close button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-head hover:opacity-50 transition-opacity cursor-pointer"
              aria-label="Close"
            >
              <IoMdClose />
            </button>

            <h2 className="head_26_medium text-head">
              Sign Up to Our Newsletter
            </h2>

            <p className="texts_14_regular text-second my-3 sm:my-4">
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>

            <div className="flex items-stretch border border-footer">
              <form
                onSubmit={handleSubmit}
                className="flex items-stretch w-full"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-3.5 texts_14_regular text-head placeholder:text-second bg-transparent outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 sm:px-5 py-3 sm:py-3.5 text-head texts_13_regular tracking-widest hover:opacity-80 transition-opacity shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "..." : "JOIN"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
