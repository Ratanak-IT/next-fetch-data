
import Link from "next/link";
import PostCard from "../components/postcard/PostCard";
import { PostResponse } from "../lib/posts";
async function getPosts() {
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
    const data=await fetch(`${BASE_API_URL}posts`);
    const posts:PostResponse[]=await data.json();
    return posts;
}
export default async function PostPage() {
    const posts = await getPosts();
    return(
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {posts.map((post)=>(
                <Link key={post.id} href={`/postblog/blog/${post.id}`}>
                <PostCard
                key={post.id}
                userId={post.userId}
                id={post.id}
                title={post.title}
                body={post.body}
                />
            </Link>
            ))}
        </div>
    )
}