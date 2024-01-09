import React from "react";

import { client } from "@/lib/sanity";
import { Product } from "@/lib/interface";
import ImageGallery from "@/components/image-gallery";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import Link from "next/link";
import AddToBag from "@/components/add-to-bag";
import CheckoutNow from "@/components/checkout-now";

async function getData(slug: Product["slug"]) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id
      }`;

  const data = await client.fetch(query);

  return data;
}

interface ProductPageProps {
  params: {
    slug: Product["slug"];
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const data: Product = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <Link
                href={`/categories/${data.categoryName}`}
                className="mb-0.5 inline-block text-gray-500 hover:text-gray-700 transition300"
              >
                {data.categoryName}
              </Link>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="gap-x-2 rounded-full">
                <span className="text-sm">4.2</span>
                <Star className="h-6 w-5" />
              </Button>
              <span className="text-sm text-gray-500">56 Ratings</span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price + 30}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag {...data} />
              <CheckoutNow {...data} />
            </div>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
