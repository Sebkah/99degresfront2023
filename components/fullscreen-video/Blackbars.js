import React from 'react';

import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useMotionValue, motion, animate } from 'framer-motion';

const Blackbars = () => {
  const router = useRouter();
  /*   const [topY, setTopY] = useState(0);
  const [bottomY, setBottomY] = useState(0); */
  const topY = useMotionValue(800);
  const bottomY = useMotionValue(-800);

  const anim = { duration: 2 };

  useEffect(() => {
    if (router.pathname == '/') {
      /*    setTopY(0);
      setBottomY(0); */
      animate(topY, -200, anim);
      animate(bottomY, 200, anim);
    } else {
      /*    setTopY(800);
      setBottomY(-800); */
      animate(topY, 800, anim);
      animate(bottomY, -800, anim);
    }
  }, [router.pathname]);

  return (
    <div className="black-bars">
      <motion.div
        transition={anim}
        /*  animate={{ y: topY }} */
        style={{ y: topY }}
        className="black-bar top"
      ></motion.div>
      <motion.div
        transition={anim}
        /*       animate={{ y: bottomY }} */
        style={{ y: bottomY }}
        className="black-bar bottom"
      ></motion.div>
    </div>
  );
};

export default Blackbars;
