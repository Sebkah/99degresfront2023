import React from 'react';
import { useAppContext } from '../../context/context';

import Link from 'next/link';
import { useRouter } from 'next/router';

const About = ({ name }) => {
  const router = useRouter();

  const { language } = useAppContext();

  return (
    <div className="about">
      {language == 'en' && (
        <>
          <p className="about-title">about</p>
          <p>
            99° is an artist-led collective and organisation founded by 11
            graduates of the Atelier Supérieur d’Animation in Paris. They met,
            worked together and formed a strong bond during their studies. The
            collective is their way of creating a structure allowing them to
            continue working as a team.
          </p>
          <p>
            99° intends to put its stamp on the spectre of the graphic arts
            through the conception of short films, music videos and other
            commissioned work, as well as through the production of exhibitions
            and publications. 99° is defined both by the diversity of personal
            styles it fosters and by the compatibility of these diverse
            practices. The collective’s commitment to cooperative work can thus
            be harnessed according to the specificities of each project.
          </p>
        </>
      )}
      {language == 'fr' && (
        <>
          <p className="about-title">à propos</p>
          <p>
            99° est un collectif d’artistes monté par 11 anciens étudiants de
            l’Atelier Supérieur d’Animation, à Paris. C’est durant leurs études
            qu’ils se rencontrent, travaillent ensemble, et qu’un lien fort se
            crée entre eux. Le collectif, c’est pour eux le moyen de mettre en
            place une structure leur permettant de continuer à travailler
            ensemble, en tant qu’équipe.
          </p>
          <p>
            99° ambitionne de marquer ses onze empreintes sur le spectre des
            arts graphiques à travers la fabrication de courts-métrages, clips
            et autres films de commande mais aussi des expositions et des
            éditions. 99° se définit à la fois par la diversité des styles qu’il
            regroupe, et par leur compatibilité et complémentarité. Ce mélange
            de différents styles et idées peut ainsi être exploité en fonction
            des spécificités de chaque projet.
          </p>
        </>
      )}
    </div>
  );
};

export default About;
