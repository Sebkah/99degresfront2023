import React from 'react';
import { useAppContext } from '../../context/context';
import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

const displacement = 10;

const DirectorBio = ({ en, fr, instaUrl, websiteUrl, email, titleColor }) => {
  const { language } = useAppContext();
  const bio = language == 'en' ? en : fr;

  const [popup, setPopup] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: displacement }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: displacement }}
        className="director-bio"
      >
        <div className="icons">
          {instaUrl && (
            <a
              target="_blank"
              rel="noreferrer"
              className="icon"
              href={instaUrl}
            >
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
            <a
              className="icon"
              target="_blank"
              rel="noreferrer"
              href={websiteUrl}
            >
              <img src="/icons/globe.svg" alt="" />
            </a>
          )}
        </div>
        <h1 style={{ backgroundColor: titleColor }}>
          {language === 'en' ? 'biography' : 'biographie'}
        </h1>

        <span>{bio}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default DirectorBio;
