import { InsertForm } from "@/components/forms/insert-form";
// import { fetchCategories } from "@/lib/data/fetchPosts";
// type Category = { id: number; name: string };
export default async function ProductPage(){
    //   const categories = (await fetchCategories()) as Category[];
    return(
        <main className="flex justify-center items-center">
        {/* <ProductViewPage productId={"new"}/> */}
        <InsertForm/>
        </main>
    )
}