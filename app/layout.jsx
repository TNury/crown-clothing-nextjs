import { Header } from './Header';

import { StoreProvider } from 'redux/StoreProvider';

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
