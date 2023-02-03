import React from 'react';
import { useAppContext } from '../../context/context';
import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

const LanguageSwitch = () => {
  const { language, setLanguage } = useAppContext();

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (language == 'en') setLanguage('fr');
    if (language == 'fr') setLanguage('en');
  };

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className="language-switch">
      <div
        onClick={() => {
          setLanguage('en');
          if (language != 'en') setIsOn(!isOn);
        }}
        className={language == 'en' ? 'language active' : 'language'}
      >
        EN
      </div>
      <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
        <motion.div className="handle" layout transition={spring} />
      </div>
      <div
        onClick={() => {
          setLanguage('fr');
          if (language != 'fr') setIsOn(!isOn);
        }}
        className={language == 'fr' ? 'language active' : 'language'}
      >
        <div className="hello">FR</div>
      </div>
    </div>
  );
};

export default LanguageSwitch;
