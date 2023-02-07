import { extendTheme } from "@chakra-ui/react";
import { ExtendedButtons as Button } from "./components/Buttons";
import { ExtendedText as Text } from "./components/Text";
const theme = extendTheme({
  config: {
    // useSystemColorMode: true,
    // initialColorMode: 'dark',
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  components: {
    Button,
    Text,
  },
});

export default theme;
