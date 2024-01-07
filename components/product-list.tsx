import React from "react";
import { Product } from "@/lib/interface";
import AddToBag from "@/components/add-to-bag";
import ProductCard from "@/components/product-card";
import { client } from "@/lib/sanity";
import { Card } from "./ui/card";
import Link from "next/link";

async function getData() {
  const query = `*[_type == 'product'] {
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

const ProductList = async () => {
  const data: Product[] = await getData();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All Products
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((product) => (
          <div
            key={product._id}
            className="flex flex-col p-2 gap-y-6 justify-between"
          >
            <ProductCard {...product} />
            {/* <AddToBag {...product} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
