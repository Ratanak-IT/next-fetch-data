import { PostResponse } from "@/lib/types/posts";

export default async function PostCard({ 
    userId=0, 
    id=0, 
    title="Title coming soon", 
    body="Description coming soon" }: PostResponse) {
  return (
    <>
      <div  className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6">
  <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
   
        
    <div className="mt-4 sm:mt-0">
      <h3 className="line-clamp-1 text-lg font-medium text-pretty text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-700">By John Doe</p>

      <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
        {body}
      </p>
    </div>
  </div>

  <dl className="mt-6 flex gap-4 lg:gap-6">
    <div className="flex items-center gap-2">
      <dt className="text-gray-700">
        <span className="sr-only"> Published on </span>
      </dt>

      <dd className="text-xs text-gray-700">31/06/2025</dd>
    </div>

    <div className="flex items-center gap-2">
      <dt className="text-gray-700">
        <span className="sr-only"> {userId} </span>
      </dt>

      <dd className="text-xs text-gray-700">{id} minutes</dd>
    </div>
  </dl>
</div>
    </>
  );
}
