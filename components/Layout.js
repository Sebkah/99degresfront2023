import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useAppContext } from '../context/context';
import { useRouter } from 'next/router';

import Blackbars from './fullscreen-video/Blackbars';
import LanguageSwitch from './navigation/LanguageSwitch';
import HamburgerMenu from './navigation/mobile/HamburgerMenu';

const Layout = ({ children }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [videoCounter, setCounter] = useState(0);
  const [popup, setPopup] = useState(false);

  const { language } = useAppContext();

  const videosUrl = [
    'https://youtu.be/-AIb3gj329k',

    /* 'https://youtu.be/q1uToY1uq1I', */
    /* 'https://youtu.be/tACFOmmVIKY', */

    /* 'https://youtu.be/O7tgF0b6uLE', */
  ];

  /*   const player = useRef(null); */
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  /* useEffect(() => {
    const counter = videoCounter + 1;
    if (router.pathname != '/') return;
    if (counter >= videosUrl.length) {
      setCounter(0);
    } else {
      setCounter((c) => c + 1);
    }
  }, [router.pathname]); */

  const isHomePage = router.pathname == '/';
  /* console.log(isHomePage); */

  return (
    <div className="container" /* style={{ backgroundColor: 'black' }} */>
      <HamburgerMenu />
      <div
        className="utilities"
        style={{
          mixBlendMode: router.pathname == '/' ? 'difference' : 'normal',
        }}
      >
        <LanguageSwitch />
        <a
          className="insta99"
          href="https://www.instagram.com/collectif99degres/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/icons/insta.svg" alt="" />
        </a>
        <a
          className="insta99"
          /*   href="mailto:collectif99degres@gmail.com" */
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            navigator.clipboard.writeText('collectif99degres@gmail.com');
            setPopup(true);
            setTimeout(() => {
              setPopup(false);
            }, 2000);
          }}
        >
          {popup && (
            <div className="copy-popup">
              {language == 'en'
                ? 'Email copié dans le presse-papier'
                : 'Email copied to clipboard'}
            </div>
          )}

          <img src="/icons/mail.svg" alt="" />
        </a>
      </div>
      {children}
      {hasWindow && true && (
        <div className="video">
          <Blackbars></Blackbars>

          <video
            className="fullscreen-video"
            autoPlay
            muted
            loop
            disablePictureInPicture
            src="../video.mp4"
          ></video>
        </div>
      )}
    </div>
  );
};

export default Layout;
