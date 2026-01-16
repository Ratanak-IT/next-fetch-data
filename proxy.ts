import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('X-App-Version', '1.0')
  response.headers.set('X-Powered-By', 'Next.js Proxy')
  return response
}
export const config = {
  matcher: '/about',
}
