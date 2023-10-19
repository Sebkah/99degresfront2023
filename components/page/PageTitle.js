import React, { useEffect, useLayoutEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Back from './Back';

import { useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import WrappingTitle from './WrappingTitle';

const displacement = 100;

const PageTitle = ({ en, fr, position, backFunction }) => {
  let isTablet = useMediaQuery('(max-width: 1200px)');
  /*   isTablet = false; */

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
          {!isTablet && <WrappingTitle en={en} fr={fr}></WrappingTitle>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTitle;
