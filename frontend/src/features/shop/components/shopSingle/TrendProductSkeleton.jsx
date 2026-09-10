import Container from "@/components/common/Container";

const TrendProductSkeleton = () => (
  <section className="mt-9.5 pb-10 lg:pb-0">
    <Container>
      <div className="h-8 w-56 animate-pulse rounded bg-[#e8e8e8]" />
      <div className="mt-8.5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-7.5">
        {Array.from({ length: 4 }, (_, index) => (
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
    </Container>
  </section>
);

export default TrendProductSkeleton;
