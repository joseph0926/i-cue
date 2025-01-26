import { getToken } from 'next-auth/jwt';
import { auth as middleware } from '@/auth';
import { ROUTES } from './constants/routes';

export default middleware(async (req) => {
  const { pathname, origin } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isSignedIn = !!token && !!token.jti;

  if (pathname === ROUTES.LANDING) {
    if (isSignedIn) {
      return Response.redirect(new URL(ROUTES.HOME, origin));
    }

    return;
  }

  if (!isSignedIn) {
    if (pathname !== ROUTES.SIGNIN && pathname !== ROUTES.SIGNUP) {
      return Response.redirect(new URL(ROUTES.SIGNIN, origin));
    }

    return;
  }

  if (pathname === ROUTES.SIGNIN || pathname === ROUTES.SIGNUP) {
    return Response.redirect(new URL(ROUTES.HOME, origin));
  }

  return;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
