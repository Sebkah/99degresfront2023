import React from 'react';

import Menu from './navigation/Menu';
import MenuItem from './navigation/MenuItem';
import About from './navigation/About';

import Blackbars from './fullscreen-video/Blackbars';

import Title from './navigation/Title';
import LanguageSwitch from './navigation/LanguageSwitch';

import ReactPlayer from 'react-player/youtube';

import { useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [videoCounter, setCounter] = useState(0);

  const videosUrl = [
    'https://youtu.be/-AIb3gj329k',

    /* 'https://youtu.be/q1uToY1uq1I', */
    /* 'https://youtu.be/tACFOmmVIKY', */

    /* 'https://youtu.be/O7tgF0b6uLE', */
  ];

  const player = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    const counter = videoCounter + 1;
    if (router.pathname != '/') return;
    if (counter >= videosUrl.length) {
      setCounter(0);
    } else {
      setCounter((c) => c + 1);
    }
  }, [router.pathname]);

  const isHomePage = router.pathname == '/';
  /* console.log(isHomePage); */

  return (
    <div className="container" /* style={{ backgroundColor: 'black' }} */>
      <div className="utilities">
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
          href="https://www.instagram.com/collectif99degres/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/icons/mail.svg" alt="" />
        </a>
      </div>
      {children}
      {hasWindow && true && (
        <div className="video">
          <Blackbars></Blackbars>
          {/*     <ReactPlayer
            className="fullscreen-video"
            width="100%"
            height="100%"
            muted={true}
            loop={true}
            playing={true}
            controls={false}
            ref={player}
            onProgress={({ playedSeconds }) => {
              if (playedSeconds > player.current.getDuration() - 50)
                player.current.seekTo(10);
            }}
            config={{
              youtube: {
                playerVars: {
                  rel: 0,
                  controls: 0,
                  iv_load_policy: 3,
                },
              },
            }}
          
            url={videosUrl[videoCounter]}
          /> */}
        </div>
      )}
    </div>
  );
};

export default Layout;
