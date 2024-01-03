interface EmailType {
  id: string;
  subject: string;
  sender: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
  body: {
    contentType: string;
    content: string;
  };
  bodyPreview: string;
  sentDateTime: string;
  webLink: string;
}
