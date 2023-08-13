import { Box, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "./../Hooks/useDebounce";
import SearchResults from "./SearchResults";

const Search = () => {
  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(queryText, 200);

  const handleChange = (e) => setQueryText(e.target.value);

  useEffect(() => {
    if (debouncedSearchTerm) {
      (async () => {
        const url = `/api/search/${debouncedSearchTerm}`;
        const data = await fetch(url, {
          method: "GET",
        });
        const result = await data.json();
        if (result) {
          setSearchResults(result);
        }
      })();
    }
  }, [debouncedSearchTerm]);

  return (
    <Box
      sx={{
        bg: "transparent",
        shadow: "lg",
        width: "100%",
      }}
    >
      <InputGroup>
        <Input
          placeholder="Search Item"
          borderRadius={"0px"}
          value={queryText}
          onChange={handleChange}
        />
        <InputRightAddon borderRadius={"0px"} bgColor="mOrange">
          <FiSearch />
        </InputRightAddon>
      </InputGroup>

      {queryText && (
        <Box
          maxH="70vh"
          p="0"
          overflowY="auto"
          position={"absolute"}
          backgroundColor="white"
          zIndex={999}
          w="50%  "
        >
          <Box px={4}>
            <Box borderTopWidth="1px" pt={2} pb={4}>
              <SearchResults
                searchResults={searchResults}
                {...{ setSearchResults }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Search;
