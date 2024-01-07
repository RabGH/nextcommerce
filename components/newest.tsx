import React from "react";

import { client } from "@/lib/sanity";
import { Product } from "@/lib/interface";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./product-card";

async function getData() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt asc) {
      _id,
      price, 
      name, 
      "slug": slug.current, 
      "categoryName": category->name,
      "images": images[].asset->url
    }`;
  const data = await client.fetch(query);
  return data;
}

const Newest = async () => {
  const data: Product[] = await getData();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Newest Products
        </h2>
        <Link
          href="/categories/productlist"
          className="text-primary flex items-center gap-x-1"
        >
          See All
          <span>
            <ArrowRight />
          </span>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Newest;
