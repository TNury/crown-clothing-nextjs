import { Header } from '@/components/layout/Header';

import { StoreProvider } from '@/components/providers/StoreProvider';

import '../styles/globals.css';

const RootLayout = ({ children }) => {
  return (
    <html>
      <head />
      <body className='pt-20'>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
