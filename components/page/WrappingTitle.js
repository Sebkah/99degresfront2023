import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/context';

const WrappingTitle = ({ en, fr }) => {
  const { language } = useAppContext();
  const titleRef = useRef(null);
  const title = language == 'en' ? en : fr;

  let frame = 10;
  let requestID;

  const moveTitle = () => {
    if (!titleRef.current) return;
    const width = titleRef.current.clientWidth;
    /*     console.log(width); */
    titleRef.current.style.transform = `translateX(${(frame * width) / -10000
      }px)`;
    frame += 1;
    if ((frame * width) / -10000 > width) frame = 0;
    /* requestID =  */requestAnimationFrame(moveTitle);
  };

  useEffect(() => {
    moveTitle();

    return () => {
      /*   cancelAnimationFrame(requestID); */
    };
  }, []);
  return (
    <motion.div className="page-title-title" ref={titleRef}>
      {Array(4)
        .fill(undefined)
        .map(() => {
          return title + '|';
        })}
    </motion.div>
  );
};

export default WrappingTitle;
