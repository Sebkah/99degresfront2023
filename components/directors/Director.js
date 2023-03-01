import React from 'react';
import { useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from 'framer-motion';

const Director = ({ director, setFeatured, featured }) => {
  const { Nom, image } = director;
  const flexShrink = useMotionValue(1);
  const flexGrow = useMotionValue(1);
  const width = useMotionValue('0%');
  const alignSelf = useMotionValue('center');

  const animConfig = { duration: 0.5, type: 'tween', ease: 'circOut' };

  useEffect(() => {
    if (director == featured) {
      animate(flexGrow, 1);
      animate(flexGrow, 0);
      animate(width, '100%', animConfig);
      animate(alignSelf, 'start');
    }
    if (director != featured) {
      animate(flexGrow, 0);
      animate(flexGrow, 1);
      animate(alignSelf, 'center');
      /*       alignSelf = 'center'; */
      animate(width, '0%', animConfig);
      if (featured != null) {
      }
    }

    if (featured == null) {
      /*    alignSelf = 'center'; */
      animate(alignSelf, 'center');
      animate(width, '100%', animConfig);
    }
  }, [featured]);

  const [name, surname] = Nom.split(' ');

  const isFeatured = featured == director;

  return (
    <motion.div
      className="director"
      onClick={() => {
        setFeatured(director);
      }}
      key={Nom}
      layout
      style={{
        flexGrow: flexGrow,
        flexShrink: flexShrink,

        width: width,
        overflow: 'hidden',
      }}
    >
      <motion.div
        className="name-container"
        layout
        style={{ alignSelf: 'start' }}
      >
        <div
          className="director-background"
          style={{
            backgroundImage: `url(${image.formats.large.url})`,
          }}
        ></div>
        <div className="surname">{surname}</div>
        <div className="name"> {name}</div>
      </motion.div>
    </motion.div>
  );
};

export default Director;
