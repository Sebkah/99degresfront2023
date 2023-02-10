import React from 'react';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useMotionValue, motion, animate } from 'framer-motion';

const Blackbars = () => {
  const router = useRouter();
  const topY = useMotionValue(0);
  const bottomY = useMotionValue(0);

  const anim = { duration: 1 };

  useEffect(() => {
    if (router.pathname == '/') {
      animate(topY, 0, anim);
      animate(bottomY, 0, anim);
    } else {
      animate(topY, 800, anim);
      animate(bottomY, -800, anim);
    }
  }, [router.pathname]);

  return (
    <div className="black-bars">
      <motion.div style={{ y: topY }} className="black-bar top"></motion.div>
      <motion.div
        style={{ y: bottomY }}
        className="black-bar bottom"
      ></motion.div>
    </div>
  );
};

export default Blackbars;
