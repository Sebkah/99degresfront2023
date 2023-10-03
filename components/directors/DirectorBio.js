import { Links } from './Links';
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

        <span>{bio}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default DirectorBio;
