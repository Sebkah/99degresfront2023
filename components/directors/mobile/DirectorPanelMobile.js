import { Name } from '../Name';
import { useAppContext } from '../../../context/context';
import { imageUrlBuilder } from '../../../config/sanity';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import DirectorBio from '../DirectorBio';
import { DirectorMovies } from '../DirectorMovies';

const DirectorPanelMobile = ({
  director,
  setIndexFeatured,
  indexFeatured,
  index,
  directorsGridRef,
}) => {
  const { language, setDirectorFeatured, directorFeatured } = useAppContext();
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

  const colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) `;

  const [forname, surname] = name.split(' ');
  return (
    <motion.div
      ref={ref}
      className="director-panel-mobile"
      animate={{ height: isFeatured ? 'min-content' : '200px' }}
      transition={{ duration: 0.5 }}
      onClick={() => {
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
        className={!isFeatured ? 'director-image active' : 'director-image'}
        placeholder="blur"
        blurDataURL={imageUrlBuilder.image(mainImage).width(12).height(3).url()}
      />
      <div className="name-container-centering">
        <Name surname={surname} name={forname} colorStyle={colorStyle} />
      </div>
      <div
        className="director-content"
        style={{
          height: 'min-content',
          position: 'relative',
          padding: '50px 50px',
        }}
      >
        <DirectorBio
          en={descEN}
          fr={descFR}
          instaUrl={instaUrl}
          websiteUrl={websiteUrl}
          email={email}
          titleColor={colorStyle}
        ></DirectorBio>
        <DirectorMovies
          director={director}
          language={language}
          titleColor={colorStyle}
        />
      </div>
    </motion.div>
  );
};

export default DirectorPanelMobile;
