import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
   const res = await fetch("https://randomuser.me/api/?results=25", {
    cache: "no-store",
  })
  const users = await res.json()
   return users.results.map((user: any, index: number) => ({
    id: index.toString(),
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    amount: Math.floor(Math.random() * 1000),
    status: "success",
  }))
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}