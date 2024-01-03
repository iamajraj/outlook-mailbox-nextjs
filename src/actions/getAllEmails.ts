'use server';

import { cookies } from 'next/headers';

type EmailResponse = {
  success: boolean;
  data: EmailType[];
};

export default async function getAllEmails(): Promise<EmailResponse> {
  try {
    // Retrieve the access token from the cookie
    const accessToken = cookies().get('accessToken')?.value;

    if (!accessToken) {
      return {
        success: false,
        data: [],
      };
    }

    // Make a request to Microsoft Graph API
    const graphApiUrl =
      'https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages';
    const graphResponse = await fetch(graphApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!graphResponse.ok)
      return {
        success: false,
        data: [],
      };

    const graphData = await graphResponse.json();
    // Send the inbox emails as JSON
    return {
      success: false,
      data: graphData.value,
    };
  } catch (error) {
    console.error('Get All Emails Error:', error);
    return {
      success: false,
      data: [],
    };
  }
}
