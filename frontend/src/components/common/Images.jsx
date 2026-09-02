import CloudlessImage from "@/components/common/CloudlessImage";

const Images = ({ imgSrc, className, imgAlt, width, height, priority, sizes }) => {
  if (!imgSrc) return null;

  return (
    <CloudlessImage
      src={imgSrc}
      alt={imgAlt || ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
};

export default Images;
