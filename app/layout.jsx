import { Header } from './Header';

import '../styles/globals.css';

const RootLayout = ({ children }) => {
  return (
    <html>
      <head />
      <body className='pt-20'>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
