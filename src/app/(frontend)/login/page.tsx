'use client';

import React, { useState } from 'react';

type Props = {};

function Login({}: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <a
        href="/api/login"
        onClick={() => setLoading(true)}
        className="px-10 py-2 border rounded-full border-blue-500 text-blue-500 flex items-center gap-4 hover:bg-blue-500/20 transition-all">
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            <img src="https://cutt.ly/zwG0Ftm3" alt="" className="w-5" />
            Login with Microsoft
          </>
        )}
      </a>
    </div>
  );
}

export default Login;
