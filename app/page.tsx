"use client"
import { CardClientList } from "@/components/CardClientList";
import { fetchPosts } from "@/lib/data/fetchPosts";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Link href={"/postblog"}>
    Click here
    </Link>
  <CardClientList fetchPosts={fetchPosts()}/>
    </>
  );
}
