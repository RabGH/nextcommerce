import { Image } from "sanity";

export interface Product {
  _id: string;
  name: string;
  description: string;
  images: Image[];
  price: number;
  slug: string;
  categoryName: string;
  price_id: string;
}
