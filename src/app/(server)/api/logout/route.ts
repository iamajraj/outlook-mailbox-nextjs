import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  });

  response.cookies.set('accessToken', '', {
    path: '/',
    sameSite: 'strict',
    secure: false,
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
