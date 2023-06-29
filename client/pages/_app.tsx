import BaseApp from '@/components/layout/base-app';
import { wrapper } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <BaseApp>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={notoSans.className}>
        <Component {...pageProps} />
      </main>
    </BaseApp>
  )
}

export default wrapper.withRedux(App);