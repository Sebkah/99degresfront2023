import React from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { imageUrlBuilder } from '../../config/sanity';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import {
  motion,
  animate,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';

import { useMediaQuery } from '../../hooks/useMediaQuery';

const Movie = ({ title, mainImage, slug, gif, colorStyle, color, textColor }) => {

  const isTablet = useMediaQuery('(max-width: 800px)');
  const elementRef = React.useRef(null);

  const isInView = useInView(elementRef);

  //Motion template for the image overlay
  const grayscale = useMotionValue(1);
  const brightness = useMotionValue(0.9);

  let filter = useMotionTemplate`grayscale(${grayscale}) brightness(${brightness})`;
  if (isTablet) filter = 'none';


  //Creating a motion value for the title color and the background color of the title
  const textColorStyle = useMotionValue("#ffffff");
  const backgroundTextColor = useMotionValue(colorStyle);

  //Disabling videos on mobile
  const disableMovieVideos = true;

  return (
    <Link
      key={title}
      ref={elementRef}
      className="movie"
      href={`/movies/${slug.current}`}
    >
      <motion.div className="movie-title" style={{ backgroundColor: backgroundTextColor, color: textColorStyle }}>
        {title}
      </motion.div>

      <motion.div
        className="color-overlay"
        style={{
          opacity: 1,
          backgroundColor: colorStyle,
          display: isTablet ? 'none' : null,
        }}
        //transition={{ duration: 0.2 }}
        whileHover={{
          opacity: 0,
          transition: { duration: 1 }
        }}
        onHoverStart={() => {
          animate(grayscale, 0);
          animate(brightness, 1);

          animate(textColorStyle, textColor);
          animate(backgroundTextColor, color);
        }}
        onHoverEnd={() => {
          animate(grayscale, 1);
          animate(brightness, 0.9);

          animate(textColorStyle, "#ffffff");
          animate(backgroundTextColor, colorStyle);
        }}
      >
      </motion.div>

      {!gif || isTablet || disableMovieVideos ? (
        <motion.div className="image-styling" style={{
          filter, height: "100%"
        }}>

          <Image
            className="movie-image"
            src={imageUrlBuilder.image(mainImage).width(800).url()}
            alt=""
            unoptimized={true}

            /* width={600}
            height={338} */
            fill={true}
            style={{ objectFit: "cover" }}


          ></Image>
        </motion.div>
      ) : (
        isInView && (
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            src={gif.secure_url}
            style={{
              filter: filter,
            }}
            className="movie-image"
          ></motion.video>
        )
      )}
    </Link>
  );
};

const MovieGrid = ({ section, title, pageContainerRef }) => {
  const { movies, rgb } = section;
  //Adjusting some titles
  if (title == "en sortant de l'école" || title == 'school is over')
    title = 'esd';
  if (title == "films de fin d'études") title = "fin d'études";

  let colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) `;
  colorStyle = 'black';
  colorStyle = '#1f1c1c';

  return (
    <div
      className="movie-section"
      style={{ backgroundColor: colorStyle }}
      onMouseEnter={() => {
        pageContainerRef.current.style.backgroundColor = colorStyle;
      }}
    >
      <h1 className="movie-section-title">{title}</h1>
      <div
        className={
          title == 'featured' || title == 'à la une'
            ? 'movie-grid featured'
            : 'movie-grid'
        }
      >
        {movies.map((movie) => (
          <Movie key={movie.title} {...movie} colorStyle={colorStyle} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
