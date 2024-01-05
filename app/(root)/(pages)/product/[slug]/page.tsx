import React from "react";

import { client } from "@/lib/sanity";
import { fullProduct } from "@/lib/interface";
import ImageGallery from "@/components/image-gallery";

async function getData(slug: fullProduct["slug"]) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name
    }`;

  const data = await client.fetch(query);
  return data;
}

interface ProductPageProps {
  params: {
    slug: fullProduct["slug"];
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
