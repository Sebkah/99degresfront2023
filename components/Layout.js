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

  const player = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

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
      </div>
      {children}
      {hasWindow && true && (
        <div className="video">
          <Blackbars></Blackbars>
          <ReactPlayer
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
                player.current.seekTo(0);
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
            url="https://www.youtube.com/watch?v=-AIb3gj329k"
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
