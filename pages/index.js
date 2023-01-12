import Head from 'next/head';
import Image from 'next/image';

import { useAppContext } from '../context/context';

export default function Home() {
  const { language, setLanguage } = useAppContext();
  return <div></div>;
}
