import { Links } from './Links';
import React from 'react';
import { useAppContext } from '../../context/context';
import { AnimatePresence, motion } from 'framer-motion';

const displacement = 10;

const DirectorBio = ({ en, fr, instaUrl, websiteUrl, email, titleColor }) => {
  const { language } = useAppContext();
  const bio = language == 'en' ? en : fr;

  const isShortText = bio.length < 300; // adjust the length as needed

  return (
    <div className={`director-bio`}>
      <div className="bio-title">
        <h1 style={{ color: titleColor }}>
          {language === 'en' ? 'biography' : 'biographie'}
        </h1>
        <Links
          instaUrl={instaUrl}
          email={email}
          language={language}
          websiteUrl={websiteUrl}
        />
      </div>

      <span className={isShortText ? 'single-column' : ''}>{bio}</span>
    </div>
  );
};

export default DirectorBio;
