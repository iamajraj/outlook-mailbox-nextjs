import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import qs from 'qs';
import { BASE_URL } from '../../../config';

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (!url.searchParams.get('code')) {
    return redirect('/');
  }

  const tenantId = process.env.TENANT_ID;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;
  const scope = process.env.SCOPE;

  const code = url.searchParams.get('code');

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const tokenData = {
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    scope: scope,
  };

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      body: qs.stringify(tokenData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!tokenResponse.ok) return redirect('/login?success=false');

    const responseData = await tokenResponse.json();
    const accessToken = responseData.access_token;

    const response = NextResponse.redirect(new URL('/', BASE_URL), {
      status: 302,
    });

    response.cookies.set('accessToken', accessToken, {
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
    return redirect('/login?success=false');
  }
}
