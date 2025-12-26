"use client"
import { CardClientList } from "@/components/CardClientList";
import { fetchPosts } from "@/lib/data/fetchPosts";

export default function Home() {
  return (
    <>
  <CardClientList fetchPosts={fetchPosts()}/>
    </>
  );
}
