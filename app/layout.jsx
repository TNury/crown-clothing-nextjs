import { Open_Sans } from 'next/font/google';

import { Header } from 'components/layout/header/Header';

import '../styles/globals.css';

export const metadata = {
  title: 'Crown Clothing | NextJS',
};

const openSans = Open_Sans({ subsets: ['latin'] });

const RootLayout = async ({ children }) => {
  return (
    <html>
      <head />
      <body className={`${openSans.className} pt-20`}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
