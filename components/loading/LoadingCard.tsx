import { Skeleton } from "../ui/skeleton";

export default function LoadingCard() {
   const cards = Array(8).fill(null);
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-10 pt-10">
      {cards.map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="w-full h-40 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      ))}
    </div>
  );
}
