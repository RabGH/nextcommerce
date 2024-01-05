"use client";

import React from "react";
import Image from "next/image";

import { fullProduct } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: fullProduct["images"];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [bigImage, setBigImage] = React.useState(images[0]);

  const handleSmallImageClick = (image: fullProduct["images"][0]) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              alt="NextCommerce"
              className={cn(
                "h-full w-full object-cover object-center cursor-pointer active:scale-90 transition150",
                bigImage === image && "border border-primary/50 rounded-lg"
              )}
              width={150}
              height={200}
              loading="lazy"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt="NextCommerce Main Product Image"
          width={500}
          height={500}
          className={cn(
            "h-full w-full object-cover object-center transition-opacity duration-500"
          )}
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          SALE
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;
