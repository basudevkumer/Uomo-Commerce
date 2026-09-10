"use client";
import Container from "@/components/common/Container";
import Product from "@/components/common/Product";
import useAllProduct from "@/features/shop/hooks/useAllProduct";
import TrendProductSkeleton from "./TrendProductSkeleton";

const Trend_product = ({ category, currentId }) => {
  const { data, isLoading, isFetching, isError } = useAllProduct(8, 0, "", category);
  const products =
    data?.products?.filter((p) => p.id !== currentId).slice(0, 4) || [];

  if (!category) return null;
  if (isLoading || isFetching) return <TrendProductSkeleton />;
  if (isError || products.length === 0) return null;

  return (
    <section className="mt-9.5 pb-10 lg:pb-0">
      <Container>
        <h3 className="head_26_regular text-head">
          RELATED <span className="head_26_bold">PRODUCTS</span>
        </h3>
        <div className="mt-8.5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-7.5">
          {products.map((p) => (
            <Product
              key={p.id}
              id={p.id}
              catagory={p.category}
              imgSrc={p.thumbnail}
              itemName={p.title}
              itemPrice={p.price}
              discountPrice={
                p.discountPercentage > 0
                  ? (p.price - (p.price * p.discountPercentage) / 100).toFixed(
                      2,
                    )
                  : null
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Trend_product;
