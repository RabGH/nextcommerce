import React from "react";
import Image from "next/image";
import Link from "next/link";

import { client, urlFor } from "@/lib/sanity";
import { simplifiedProduct } from "@/lib/interface";

async function getData(category: simplifiedProduct["categoryName"]) {
  const query = `*[_type == "product" && category->name == "${category}"] {
        _id,
        "imageUrl": images[0].asset->url,
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
  params: { category: simplifiedProduct["categoryName"] };
}) => {
  const data: simplifiedProduct[] = await getData(params.category);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Products for {params.category}
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((product) => (
          <div key={product._id} className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80 transition300">
              <Image
                src={urlFor(product.imageUrl).url()}
                alt="NextCommerce Product Image"
                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                width={300}
                height={300}
              />
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
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
