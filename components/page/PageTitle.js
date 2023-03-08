import React from 'react';
import { useAppContext } from '../../context/context';

import { AnimatePresence, motion } from 'framer-motion';
import Back from './Back';

const displacement = 100;

const PageTitle = ({ en, fr, position }) => {
  const { language } = useAppContext();
  const title = language == 'en' ? en : fr;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: displacement }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: displacement }}
        className="page-title"
        style={{ position: position }}
      >
        <Back></Back>
        {title}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTitle;
