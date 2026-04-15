import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

function isAuthorized(request: NextRequest): boolean {
  const username = process.env.STUDIO_USERNAME;
  const password = process.env.STUDIO_PASSWORD;

  // If credentials are not configured, allow through (local dev)
  if (!username || !password) return true;

  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Basic ')) return false;

  const decoded = atob(authHeader.slice(6));
  const colon = decoded.indexOf(':');
  if (colon === -1) return false;

  const suppliedUsername = decoded.slice(0, colon);
  const suppliedPassword = decoded.slice(colon + 1);

  return suppliedUsername === username && suppliedPassword === password;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/studio')) {
    if (!isAuthorized(request)) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Studio", charset="UTF-8"' },
      });
    }
    return NextResponse.next();
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};