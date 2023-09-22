import React, { useLayoutEffect } from 'react';
import { useAppContext } from '../../context/context';

import { AnimatePresence, motion } from 'framer-motion';
import Back from './Back';

import { useRef } from 'react';

const displacement = 100;

const PageTitle = ({ en, fr, position, back = '/' }) => {
  const { language } = useAppContext();
  const titleRef = useRef(null);
  const title = language == 'en' ? en : fr;

  useLayoutEffect(() => {
    console.log(titleRef.current.offsetWidth, titleRef.current.scrollWidth);
    console.log(titleRef.current.offsetWidth < titleRef.current.scrollWidth);
  }, [titleRef]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: displacement }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: displacement }}
        className="page-title"
        style={{ position: position }}
      >
        <Back back={back}></Back>
        <motion.div className="page-title-title" ref={titleRef}>
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
          {title}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTitle;
