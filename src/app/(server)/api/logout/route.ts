import { NextResponse } from 'next/server';
import { BASE_URL } from '../../../../config';

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/login', BASE_URL), {
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
