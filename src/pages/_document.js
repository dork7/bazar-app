import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './../config/theme';
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={'light'} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
