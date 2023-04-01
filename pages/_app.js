import '../styles/globals.scss';

import { Context } from '../context/context';

import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

function MyApp({ Component, pageProps, data }) {
  /*   console.log(data); */

  return (
    <Context>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context>
  );
}

export default MyApp;
