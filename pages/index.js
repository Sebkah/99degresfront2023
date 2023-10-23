import Head from 'next/head';
import Image from 'next/image';

import Title from '../components/navigation/Title';
import LanguageSwitch from '../components/navigation/LanguageSwitch';
import Menu from '../components/navigation/Menu';
import MenuItem from '../components/navigation/MenuItem';
import MenuItemReal from '../components/navigation/MenuItemReal';
import HamburgerMenu from '../components/navigation/mobile/HamburgerMenu';

import About from '../components/navigation/About';

import { AnimatePresence, motion } from 'framer-motion';

import { useAppContext } from '../context/context';

import { useRouter } from 'next/router';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Home() {
  const { language, setLanguage } = useAppContext();
  const isTablet = useMediaQuery('(max-width: 800px)');

  const router = useRouter();
  const isHomePage = router.pathname == '/';
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isTablet && <HamburgerMenu />}
      <Title />
      <Menu>
        <MenuItemReal />
        <MenuItem name={['movies', 'films']} />
        <MenuItem name={['about', 'à propos']} />
      </Menu>
    </motion.header>
  );
}
