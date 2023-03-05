import React from 'react';
import { useState } from 'react';
export function Links({ instaUrl, email, language, websiteUrl }) {
  const [popup, setPopup] = useState(false);

  return (
    <div className="icons">
      {instaUrl && (
        <a target="_blank" rel="noreferrer" className="icon" href={instaUrl}>
          <img src="/icons/insta.svg" alt="" />
        </a>
      )}

      {email && (
        <div
          onClick={() => {
            navigator.clipboard.writeText(email);
            setPopup(true);
            setTimeout(() => {
              setPopup(false);
            }, 2000);
          }}
          className="icon"
          href=""
        >
          {popup && (
            <div className="copy-popup">
              {language == 'en'
                ? 'Email copié dans le presse-papier'
                : 'Email copied to clipboard'}
            </div>
          )}
          <img src="/icons/mail.svg" alt="" />
        </div>
      )}

      {websiteUrl && (
        <a className="icon" target="_blank" rel="noreferrer" href={websiteUrl}>
          <img src="/icons/globe.svg" alt="" />
        </a>
      )}
    </div>
  );
}
