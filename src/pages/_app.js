import Layout from '@/components/Layout';
import theme from '@/config/theme';
import { NotificationContextProvider } from '@/store/NotificationContext';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </ChakraProvider>
  );
}
