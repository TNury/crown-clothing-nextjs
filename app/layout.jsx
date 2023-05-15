import { Header } from '@/components/layout/header/Header';

import { StoreProvider } from '@/components/providers/StoreProvider';

import '../styles/globals.css';

/*
  Idea for persistence: 

  1. Call cookies here;
  2. Pass them to a ContextProvider;
  3. Use the cookies we aquired as their initial state;
  4. GG.

*/ 

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
