import BaseApp from '@/components/layout/base-app';
import { wrapper } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Noto_Sans } from 'next/font/google';
import axios from 'axios';
import Modal from 'react-modal';
import MainContainer from '@/components/layout/main-container';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3003';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

Modal.setAppElement('body');

function App({ Component, pageProps }: AppProps) {
  return (
    <BaseApp>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={notoSans.className}>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </main>
    </BaseApp>
  )
}

export default wrapper.withRedux(App);