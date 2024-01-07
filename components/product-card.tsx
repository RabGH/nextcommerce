import React from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

import { Product } from "@/lib/interface";

const ProductCard = (product: Product) => {
  let imageUrl;
  if (product.images && product.images.length > 0) {
    imageUrl = urlFor(product.images[0]).url();
  }
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80 transition300">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="NextCommerce Product Image"
            className="w-full h-full object-cover object-center lg:h-full lg:w-full"
            width={300}
            height={300}
          />
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 group-hover:text-primary transition300">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500 group-hover:scale-[1.01] transition300">
            {product.categoryName}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900 group-hover:font-semibold transition300">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
