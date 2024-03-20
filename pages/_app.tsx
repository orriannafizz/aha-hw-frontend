import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';

/**
 * App component
 * @param {AppProps} { Component, pageProps }
 * @return {JSX.Element}
 */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
