'use client';

import moment from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';

type Props = {
  emails: EmailType[];
  success: boolean;
};

function InboxView({ emails, success }: Props) {
  const [filteredEmails, setFilteredEmails] = useState(emails);
  const [activeViewMail, setActiveViewMail] = useState<EmailType | null>(null);

  const setCurrentViewMail = (email: EmailType) => {
    setActiveViewMail(email);
  };
  const clearViewEmail = () => {
    setActiveViewMail(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setFilteredEmails(emails);
    }
    const searchedEmails = emails.filter((email) => {
      return (
        email.sender.emailAddress.address.toLowerCase().includes(value) ||
        email.sender.emailAddress.name.toLowerCase().includes(value) ||
        email.subject.toLowerCase().includes(value) ||
        email.bodyPreview.toLowerCase().includes(value)
      );
    });

    setFilteredEmails(searchedEmails);
  };

  return (
    <div className="w-full max-w-7xl mt-5 mx-auto h-full flex flex-col overflow-hidden mb-5  bg-white/40 backdrop-blur-md rounded-lg">
      {activeViewMail ? (
        <ViewEmail email={activeViewMail} clearViewEmail={clearViewEmail} />
      ) : (
        <>
          <div className="bg-white py-4 px-5">
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none w-full"
              onChange={handleChange}
            />
          </div>
          <div className="w-full h-full py-5 px-5 flex flex-col gap-2 overflow-y-scroll c-scrollbar">
            {filteredEmails.length === 0 ? (
              <p className="text-center">Empty Inbox</p>
            ) : (
              filteredEmails.map((email) => (
                <Mail
                  key={email.id}
                  email={email}
                  setActiveViewMail={setCurrentViewMail}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Mail({
  email,
  setActiveViewMail,
}: {
  email: EmailType;
  setActiveViewMail: (email: EmailType) => void;
}) {
  return (
    <div
      onClick={() => {
        setActiveViewMail(email);
      }}
      className="flex cursor-pointer select-none bg-white rounded-[10px] px-5 py-4 transition-all hover:border-2 hover:border-gray-100 hover:shadow-md border-2 border-transparent">
      <p className="w-[20%]">
        {email.sender.emailAddress.name ?? email.sender.emailAddress.address}
      </p>
      <div className="w-[80%] flex items-start justify-between">
        <span className="flex items-center gap-4">
          <p>{email.subject}</p>
          <p className="text-sm text-gray-500">{email.bodyPreview}</p>
        </span>
        <p className="text-[12px]">{moment(email.sentDateTime).fromNow()}</p>
      </div>
    </div>
  );
}

function ViewEmail({
  email,
  clearViewEmail,
}: {
  email: EmailType;
  clearViewEmail: () => void;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-5 py-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          onClick={clearViewEmail}
          stroke="currentColor"
          className="w-5 h-5 cursor-pointer">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </div>
      <div className="h-full w-full bg-white px-5 pb-10 overflow-hidden flex flex-col">
        <div className="mt-3 pb-4 border-b flex items-center gap-3 justify-between">
          <p className="text-2xl w-full">{email.subject}</p>
          <a href={email.webLink}>
            <abbr title="Web Link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </abbr>
          </a>
        </div>
        <div className="ml-5 flex items-start justify-between mt-5">
          <span className="block">
            <p>{email.sender.emailAddress.name}</p>
            <p className="text-sm text-gray-700">
              {email.sender.emailAddress.address}
            </p>
          </span>
          <p className="text-sm">{moment(email.sentDateTime).fromNow()}</p>
        </div>
        <div
          className="ml-5 mt-16 h-full overflow-y-scroll c-scrollbar"
          dangerouslySetInnerHTML={{ __html: email.body.content }}></div>
      </div>
    </div>
  );
}

export default InboxView;
