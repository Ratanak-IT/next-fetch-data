
import Link from "next/link";

export default function Home() {
  return (
    <Link href="/postblog">
      <button className="border p-[10px] bg-red-300 rounded-[10px] m-auto block hover:bg-blue-200">Go to postBlog</button>
    </Link>
  );
}
