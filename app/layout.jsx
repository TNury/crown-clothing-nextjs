import { Header } from '@/components/layout/header/Header';

import { retrieveCookie } from './actions/cookies/cookies';

import '../styles/globals.css';

const RootLayout = async ({ children }) => {
  const userSession = await retrieveCookie('userSession') || {};

  return (
    <html>
      <head />
      <body className='pt-20'>
        <Header userSession={userSession} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
