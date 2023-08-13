import Layout from "@/components/layout";
import theme from "@/config/theme";
import { NotificationContextProvider } from "@/store/NotificationContext";
import { UserContextProvider } from "@/store/UserContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <NotificationContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
}
