import Head from 'next/head';
import Image from 'next/image';

import Title from '../components/navigation/Title';
import LanguageSwitch from '../components/navigation/LanguageSwitch';
import Menu from '../components/navigation/Menu';
import MenuItem from '../components/navigation/MenuItem';

import About from '../components/navigation/About';

import { useAppContext } from '../context/context';

export default function Home() {
  const { language, setLanguage } = useAppContext();
  return <div className=""></div>;
}
