import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function proxy(request: NextRequest) {
  const is_login=false;
  if(!is_login){
    return NextResponse.redirect(new URL('/postblog/newform', request.url))
  }
  const response = NextResponse.next()
  response.headers.set('X-App-Version', '1.0')
  response.headers.set('X-Powered-By', 'Next.js Proxy')
  return response
}
export const config = {
  matcher: '/postblog',

}
