import { Open_Sans } from 'next/font/google';

import { Header } from 'components/layout/header/Header';

import { retrieveCookie } from './actions/cookies/cookies';

import '../styles/globals.css';

export const metadata = {
  title: 'Crown Clothing | NextJS',
};

const openSans = Open_Sans({ subsets: ['latin'] });

const RootLayout = async ({ children }) => {
  const userSession = (await retrieveCookie('userSession')) || {};
  const cartSession = (await retrieveCookie('cartSession')) || {};

  return (
    <html>
      <head />
      <body className={`${openSans.className} pt-20`}>
        <Header userSession={userSession} cartSession={cartSession} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
