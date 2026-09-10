"use client";

import Link from "next/link";
import { FiX } from "react-icons/fi";

const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1";

const AboutVideoModal = () => {
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 p-4 sm:p-8">
      <div className="relative w-full max-w-5xl overflow-hidden bg-black shadow-2xl">
        <Link
          href="/about"
          aria-label="Close brand film"
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-head transition hover:bg-white"
        >
          <FiX size={22} />
        </Link>
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={YOUTUBE_VIDEO_URL}
            title="Uomo brand film"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default AboutVideoModal;
