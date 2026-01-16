"use client"
import { PostResponse } from "@/lib/types/posts";
import Link from "next/link";
import { use } from "react";
import PostCard from "./postcard/PostCard";

export function CardClientList(
    {fetchPosts}:{fetchPosts: Promise<PostResponse[]>}
){
    const posts= use(fetchPosts)
    console.log(posts)
    return(
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4">
    {posts.map((post,index)=>(
                <Link key={index} href={`/postblog/blog/${post.id}`}>
                <PostCard
                key={index}
                userId={post.userId}
                id={post.id}
                title={post.title}
                body={post.body}
                />
            </Link>
    ))
}
</div>
    )}