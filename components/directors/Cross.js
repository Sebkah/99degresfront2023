import { motion, animate, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRef, useEffect, useContext } from 'react';

const Cross = ({ setIndexFeatured, render, setDirectorFeatured }) => {
  const variants = {
    hidden: {
      pathLength: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
    show: {
      pathLength: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {render && (
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            console.log('baaack');
            setIndexFeatured(null);
            setDirectorFeatured(null);
          }}
          layoutId="cross"
          className="crossLink"
        >
          <motion.svg
            variants={variants}
            initial="hidden"
            exit="hidden"
            animate="show"
            viewBox="0 0 50 50"
            className="cross"
          >
            <motion.line
              variants={variants}
              stroke="white"
              strokeWidth="2"
              x2="0"
              y2="0"
              x1="50"
              y1="50"
            />
            <motion.line
              variants={variants}
              stroke="white"
              strokeWidth="2"
              x1="0"
              y1="50"
              x2="50"
              y2="0"
            />
            <motion.line
              variants={variants}
              stroke="white"
              strokeWidth="2"
              x1="0"
              y1="25"
              x2="0"
              y2="25"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cross;
