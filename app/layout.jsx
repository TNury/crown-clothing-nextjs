import '../styles/globals.css';

const RootLayout = ({ children }) => {
  return (
    <html>
      <head />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
