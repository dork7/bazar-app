import { HStack, Text } from "@chakra-ui/layout";
import CartDrawer from "../CartDrawer";
import Search from "../SearchField/Search";

const SearchBar = () => {
  return (
    // <Flex justify="space-around">
    <HStack gap={6} m={2}>

      <Search />
      <CartDrawer />
    </HStack>
    // </Flex>
  );
};

export default SearchBar;
