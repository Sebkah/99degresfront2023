import React from 'react';

import Menu from './navigation/Menu';
import MenuItem from './navigation/MenuItem';
import About from './navigation/About';

import Title from './navigation/Title';
import LanguageSwitch from './navigation/LanguageSwitch';

import ReactPlayer from 'react-player/youtube';

import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';

const Layout = ({ children }) => {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  return (
    <>
      <div className="container">
        <header>
          <Title />
          <LanguageSwitch />

          <Menu>
            {/*   <MenuItem name={['about', 'à propos']} /> */}
            <MenuItem name={['directors', 'réalisateurs']} />
            <MenuItem name={['movies', 'films']} />
          </Menu>
          <About />
        </header>
        <main className="page-container">{children}</main>
      </div>

      {hasWindow && (
        <ReactPlayer
          className="fullscreen-video"
          width="100%"
          height="100%"
          muted={true}
          loop={true}
          playing={true}
          controls={false}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                rel: 0,
                controls: 0,
                iv_load_policy: 3,
              },
            },
          }}
          url="https://www.youtube.com/watch?v=-AIb3gj329k"
        />
      )}
    </>
  );
};

export default Layout;
