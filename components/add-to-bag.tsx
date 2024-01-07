"use client";

import React from "react";
import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "@/lib/interface";
import { urlFor } from "@/lib/sanity";

const AddToBag = (product: Product) => {
  const { addItem, handleCartClick } = useShoppingCart();

  let imageUrl;
  if (product.images && product.images.length > 0) {
    imageUrl = urlFor(product.images[0]).url();
  }

  const productForCart = {
    name: product.name,
    price: product.price,
    image: imageUrl,
    currency: "USD",
    sku: product._id,
    description: product.description,
  };

  const handleAddItem = () => {
    addItem(productForCart);
    handleCartClick();
  };

  return <Button onClick={() => handleAddItem()}>Add to Cart</Button>;
};

export default AddToBag;
