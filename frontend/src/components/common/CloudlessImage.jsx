import { getDemoImageUrl } from "@/helpers/dummyData";

const CloudlessImage = ({
  src,
  alt = "",
  width,
  height,
  className,
  priority,
  quality,
  format,
  fetchPriority,
  ...props
}) => (
  <img
    src={getDemoImageUrl(src)}
    alt={alt}
    width={width}
    height={height}
    className={className}
    loading={priority ? "eager" : props.loading || "lazy"}
    fetchPriority={fetchPriority}
    {...props}
  />
);

export default CloudlessImage;
