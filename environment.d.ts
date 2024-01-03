declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      TENANT_ID: string;
      REDIRECT_URI: string;
      SCOPE: string;
    }
  }
}
export {};
