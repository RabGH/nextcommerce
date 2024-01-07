"use client";

import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { fullProduct } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselApi,
} from "@/components/ui/carousel";

interface ImageGalleryProps {
  images: fullProduct["images"];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [selectedIndex, setSelectedIndex] = React.useState<
    number | undefined
  >();

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setSelectedIndex(newIndex);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
      className="grid gap-4 lg:grid-cols-5"
    >
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, index) => (
          <CarouselDots
            key={index}
            className={cn("overflow-hidden rounded-lg bg-gray-100")}
            selectedIndex={index}
          >
            <Image
              src={urlFor(image).url()}
              alt="NextCommerce"
              className={cn(
                "h-full w-full object-cover object-center cursor-pointer active:scale-90 transition150",
                {
                  "border-primary/50 border rounded-lg transition-colors duration-300 ease-in-out":
                    index === selectedIndex,
                }
              )}
              width={150}
              height={200}
              loading="lazy"
            />
          </CarouselDots>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <CarouselContent>
          {images.map((bigImage, index) => (
            <CarouselItem key={index}>
              <Image
                src={urlFor(bigImage).url()}
                alt="NextCommerce Main Product Image"
                width={500}
                height={500}
                className={cn(
                  "h-full w-full object-cover object-center transition-opacity duration-500"
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          SALE
        </span>
      </div>
    </Carousel>
  );
};

export default ImageGallery;
