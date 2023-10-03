import React from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from 'framer-motion';
import { useRouter } from 'next/router';

import Image from 'next/image';

import {
  sanityStaticProps,
  imageUrlBuilder,
  useSanityQuery,
  PortableText,
} from '../../config/sanity';

const brghtnss = 1;

export function DirectorMovie({
  movie,

  paletteSelector,
  titleColor,
  director,
}) {
  const router = useRouter();
  const { title, mainImage, id, slug } = movie;
  const { rgb } = director;
  /*   console.log(movie); */

  const grayscale = useMotionValue(1);
  const brightness = useMotionValue(brghtnss);

  const filter = useMotionTemplate`grayscale(${grayscale}) brightness(${brightness})`;

  /*   const palette = 0; */

  /*  const colorStyle = `rgb(${color[paletteSelector][0]}, ${color[paletteSelector][1]}, ${color[paletteSelector][2]}) `; */
  const colorStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) `;
  /*   console.log(movie); */

  const image = imageUrlBuilder.image(mainImage);

  /*   console.log(imageUrlBuilder.image(mainImage)); */

  return (
    <div
      key={id}
      className="director-movie"
      onClick={() => {
        router.push(`/movies/${slug.current}`);
      }}
    >
      <motion.div
        className="color-overlay"
        style={{
          opacity: 1,
          backgroundColor: colorStyle,
        }}
        /*  transition={{ duration: 0.2 }} */
        whileHover={{
          opacity: 0,
        }}
        onHoverStart={() => {
          animate(grayscale, 0);
          animate(brightness, 1);
          /*     grayscale.set(0);
          brightness.set(1); */
        }}
        onHoverEnd={() => {
          animate(grayscale, 1);
          animate(brightness, brightness);
          /*   grayscale.set(1);
          brightness.set(brghtnss); */
        }}
      ></motion.div>
      <div
        className="movie-title"
        style={{ backgroundColor: colorStyle, color: 'white' }}
      >
        {title}
      </div>
      <motion.div
        style={{
          filter: filter,
        }}
        className="movie-image"
      >
        <Image
          width="600"
          height="338"
          src={imageUrlBuilder.image(mainImage).width(600).height(338).url()}
          alt=""
        />
      </motion.div>
    </div>
  );
}
