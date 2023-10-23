import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useAppContext } from '../../../context/context';
import { imageUrlBuilder } from '../../../config/sanity';
import { Name } from '../Name';
import DirectorBio from '../DirectorBio';
import { DirectorMovies } from '../DirectorMovies';

const DirectorPanelMobile = ({
  director,
  setIndexFeatured,
  indexFeatured,
  index,
  directorsGridRef,

  callBackArray,
  scrollPercentageRef,
}) => {
  const { language, setDirectorFeatured } = useAppContext();
  const {
    slug,
    name,
    mainImage,
    descEN,
    descFR,
    email,
    websiteUrl,
    instaUrl,
    rgb,
  } = director;

  /* Checking if this panel is featured */
  const isFeatured = indexFeatured === index;
  const ref = useRef(null);

  const isInView = useInView(ref, {
    window,
    margin: '2% 0px -98% 0px',
    amount: 1,
  });

  const [isOnTop, setIsOnTop] = useState(false);

  const colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) `;

  useEffect(() => {
    callBackArray.current.push(() => {
      //if the panel is close to the top set isOnTop to true
      const scrollPercentageTop = (1 / 11) * index;
      if (
        Math.abs(scrollPercentageRef.current - scrollPercentageTop) <
        1 / 11
      ) {
        setIsOnTop(true);
      } else {
        setIsOnTop(false);
      }
    });
  }, []);

  const [forname, surname] = name.split(' ');
  return (
    <motion.div
      ref={ref}
      className="director-panel-mobile"
      animate={{ height: isFeatured ? 'min-content' : '200px' }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        if (isFeatured) {
          setIndexFeatured(null);
          setDirectorFeatured(null);
          return;
        }
        setIndexFeatured(index);
        setDirectorFeatured(slug);
        console.log('Selected : ', director.name);
      }}
      onAnimationComplete={(definition) => {
        if (definition.height === 'min-content') {
          directorsGridRef.current.scrollTo({
            top: index * 200,
            behavior: 'smooth',
          });
          console.log(directorsGridRef, ref.current);
        }
      }}
      style={{ backgroundColor: colorStyle }}
    >
      <Image
        width={1200}
        height={210}
        src={imageUrlBuilder
          .image(mainImage)
          .width(1200)
          .height(210)
          .fit('clip')
          /*  .crop('top') */
          .url()}
        alt="director image"
        className={
          isFeatured || isOnTop ? 'director-image active' : 'director-image'
        }
        style={isInView && { filter: 'grayScale(0) brightness(1)' }}
        placeholder="blur"
        blurDataURL={imageUrlBuilder.image(mainImage).width(12).height(3).url()}
      />
      <div className="name-container-centering">
        <Name surname={surname} name={forname} colorStyle={colorStyle} />
      </div>
      <div className="director-content">
        <DirectorBio
          en={descEN}
          fr={descFR}
          instaUrl={instaUrl}
          websiteUrl={websiteUrl}
          email={email}
          titleColor={colorStyle}
        ></DirectorBio>
        <DirectorMovies
          isMobile={true}
          director={director}
          language={language}
          titleColor={colorStyle}
        />
      </div>
    </motion.div>
  );
};

export default DirectorPanelMobile;
