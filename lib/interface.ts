import { Image } from "sanity";

export interface simplifiedProduct {
  _id: string;
  name: string;
  imageUrl: Image;
  price: number;
  slug: string;
  categoryName: string;
}

export interface fullProduct {
  _id: string;
  name: string;
  description: string;
  images: Image[];
  price: number;
  slug: string;
  categoryName: string;
}
