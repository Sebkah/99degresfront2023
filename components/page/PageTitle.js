import React, { useEffect, useLayoutEffect } from 'react';
import { useAppContext } from '../../context/context';

import { AnimatePresence, motion } from 'framer-motion';
import Back from './Back';

import { useRef } from 'react';

const displacement = 100;

const PageTitle = ({ en, fr, position, backFunction }) => {
  const { language } = useAppContext();
  const titleRef = useRef(null);
  const title = language == 'en' ? en : fr;

  let frame = 10;
  let requestID;

  const moveTitle = () => {
    const width = titleRef.current.clientWidth;
    /*     console.log(width); */
    titleRef.current.style.transform = `translateX(${
      (frame * width) / -10000
    }px)`;
    frame += 1;
    if ((frame * width) / -10000 > width) frame = 0;
    requestID = requestAnimationFrame(moveTitle);
  };

  useEffect(() => {
    moveTitle();

    return () => {
      cancelAnimationFrame(requestID);
    };
  }, []);

  useLayoutEffect(() => {
    console.log(titleRef.current.offsetWidth, titleRef.current.scrollWidth);
    console.log(titleRef.current.offsetWidth < titleRef.current.scrollWidth);
  }, [titleRef]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 /* x: displacement */ }}
        animate={{ opacity: 1 /* x: 0 */ }}
        exit={{ opacity: 0 /* x: displacement */ }}
        className="page-title"
        style={{ position: position }}
      >
        <Back backFunction={backFunction}></Back>
        <div className="page-title-wrapper">
          <motion.div className="page-title-title" ref={titleRef}>
            {Array(20)
              .fill(undefined)
              .map(() => {
                return title + '|';
              })}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTitle;
