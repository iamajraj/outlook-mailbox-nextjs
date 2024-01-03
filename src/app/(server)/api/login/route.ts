export async function GET(request: Request) {
  const tenantId = process.env.TENANT_ID;
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;
  const scope = process.env.SCOPE;

  const authorizationUrl =
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` +
    `client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;

  return Response.redirect(authorizationUrl);
}
