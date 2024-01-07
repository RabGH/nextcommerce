import React from "react";

import { client } from "@/lib/sanity";
import { Product } from "@/lib/interface";
import ProductCard from "@/components/product-card";

async function getData(category: Product["categoryName"]) {
  const query = `*[_type == "product" && category->name == "Men"] {
      _id,
      "images": images[].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name
  }`;
  const data = await client.fetch(query);

  return data;
}

const CategoryPage = async ({
  params,
}: {
  params: { category: Product["categoryName"] };
}) => {
  const data: Product[] = await getData(params.category);

  if (data.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          No products found for category: {params.category}
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Products for {params.category}
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
