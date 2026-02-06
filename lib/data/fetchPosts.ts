import axios from "axios";
import { PostResponse } from "../types/posts";
import { ProductRequest } from "../types/product";

const BASE_API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPosts(){
    const data=await fetch (`${BASE_API}posts`);
    const posts:PostResponse[]=await data.json();
    return posts;
}
export async function fetchCategories() {
  const res = await axios.get(`${BASE_API}api/v1/categories`);
  return res.data;
}

export async function insertProduct(product: ProductRequest) {
  const res = await axios(`${BASE_API}api/v1/products`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(product)
  });

  return res; // keep returning full axios response if you want
}
