import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** proxy (구 middleware) */
export const proxy = (req: NextRequest) => {
  const res = NextResponse.next();
  const pathName = req.nextUrl.pathname;

  if (pathName === '/') {
    return NextResponse.redirect(new URL('/foo-ground', req.url));
  }

  return res;
};

export const config = {
  matcher: ['/'],
};
