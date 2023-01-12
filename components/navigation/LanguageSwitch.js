import React from 'react';
import { useAppContext } from '../../context/context';

const LanguageSwitch = () => {
  const { language, setLanguage } = useAppContext();
  return (
    <div className="language-switch">
      <div
        onClick={() => {
          setLanguage('en');
        }}
        className="language"
      >
        EN
      </div>
      <div
        onClick={() => {
          setLanguage('fr');
        }}
        className="language"
      >
        FR
      </div>
    </div>
  );
};

export default LanguageSwitch;
