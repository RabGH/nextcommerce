"use client";

import React from "react";
import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";

const CheckoutNow = (product: Product) => {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: Product["price_id"]) {
    checkoutSingleItem(priceId);
  }

  let imageUrl;
  if (product.images && product.images.length > 0) {
    imageUrl = urlFor(product.images[0]).url();
  }

  const productForCart = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: imageUrl,
    currency: "USD",
    // sku: product._id,
    slug: product.slug,
    sku: product.price_id,
  };

  return (
    <Button variant={"secondary"} onClick={() => buyNow(product.price_id)}>
      Checkout
    </Button>
  );
};

export default CheckoutNow;
