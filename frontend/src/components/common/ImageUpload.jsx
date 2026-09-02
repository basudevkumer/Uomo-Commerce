"use client";
import { useState } from "react";
import CloudlessImage from "@/components/common/CloudlessImage";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (file) setImageUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {imageUrl && (
        <CloudlessImage
          src={imageUrl}
          width={400}
          height={300}
          alt="Selected upload"
        />
      )}
    </div>
  );
}
