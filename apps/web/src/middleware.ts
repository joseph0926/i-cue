import { getToken } from 'next-auth/jwt';
import { auth as middleware } from '@/auth';
import { ROUTES } from './constants/routes';

export default middleware(async (req) => {
  const { pathname, origin } = req.nextUrl;

  if (pathname === ROUTES.HOME) {
    return;
  }
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isSignedIn = !!token && !!token.jti;

  if (!isSignedIn) {
    if (pathname !== ROUTES.SIGNIN && pathname !== ROUTES.SIGNUP) {
      const newUrl = new URL(ROUTES.SIGNIN, origin);
      return Response.redirect(newUrl);
    }
    return;
  }

  if (pathname === ROUTES.SIGNIN || pathname === ROUTES.SIGNUP) {
    const newUrl = new URL(ROUTES.HOME, origin);
    return Response.redirect(newUrl);
  }

  return;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
