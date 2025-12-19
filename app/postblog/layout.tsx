export default function PostBlogLayout({
    children,
}:{
    children:React.ReactNode
}
){
    return(
       
      <section className="bg-red-100">
        {children}
      </section>
    )
}