import { getToken } from 'next-auth/jwt';
import { auth as middleware } from '@/auth';

export default middleware(async (req) => {
  const { pathname, origin } = req.nextUrl;

  if (pathname === '/') {
    return;
  }
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isSignedIn = !!token && !!token.jti;

  if (!isSignedIn) {
    if (pathname !== '/sign-in' && pathname !== '/sign-up') {
      const newUrl = new URL('/sign-in', origin);
      return Response.redirect(newUrl);
    }
    return;
  }

  if (pathname === '/sign-in' || pathname === '/sign-up') {
    const newUrl = new URL('/', origin);
    return Response.redirect(newUrl);
  }

  return;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
