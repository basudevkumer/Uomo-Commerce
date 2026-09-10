"use client";

const ShopProductSkeleton = ({ cols = 4, count = 16 }) => {
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[cols];

  return (
    <div
      aria-label="Loading products"
      aria-busy="true"
      className={`grid gap-4 pt-10 pb-12.5 sm:gap-6 md:gap-7.5 ${gridColumns}`}
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-sm" aria-hidden="true">
          <div className="relative aspect-square overflow-hidden bg-[#f1f1f1]">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>
          <div className="space-y-2.5 px-3 pb-3 pt-4">
            <div className="h-3 w-1/3 animate-pulse rounded bg-[#e8e8e8]" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-[#e8e8e8]" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-[#e8e8e8]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProductSkeleton;
