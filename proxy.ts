import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest){
    // is logined, if you are not login,redirect to /login
    console.log('....... proxy -------')
    console.log('request url : ',request.url)
    console.log('request pathname : ', request.nextUrl.pathname)
    const isLogin=false;
    if(!isLogin){
        return NextResponse.redirect(new URL('/auth/login',request.url))
    }
    return NextResponse.next();
}
export const config = {
  matcher: '/postblog/:path*',
}