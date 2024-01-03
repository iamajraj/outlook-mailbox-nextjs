import React from 'react';

type Props = {};

function Login({}: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <a
        href="/api/login"
        className="px-10 py-2 border rounded-full border-blue-500 text-blue-500 flex items-center gap-4 hover:bg-blue-500/20 transition-all">
        <img src="https://cutt.ly/zwG0Ftm3" alt="" className="w-5" />
        Login with Outlook
      </a>
    </div>
  );
}

export default Login;
