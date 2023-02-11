import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Center,
  chakra,
  Input,
  InputRightAddon,
  InputGroup,
} from '@chakra-ui/react';
import axios from 'axios';

// import { SearchIcon } from '@chakra-ui/icons';

import SearchResults from './SearchResults';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const [queryText, setQueryText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => setQueryText(e.target.value);

  useEffect(() => {
    // if (!queryText) {
    //   setSearchResults([]);
    //   return false;
    // }
    (async () => {
      console.log('object :>> ', queryText);
      const url = `/api/search/${queryText}`;
      const { data } = await fetch(url, {
        method: 'GET',
      });
      //   setSearchResults(data);
    })();
  }, [queryText]);

  return (
    <Box
      sx={{
        bg: 'transparent',
        shadow: 'lg',
        width: '100%',
      }}
    >
      <InputGroup>
        <Input
          placeholder="Search Item"
          borderRadius={'0px'}
          value={queryText}
          onChange={handleChange}
        />
        <InputRightAddon borderRadius={'0px'} bgColor="mOrange">
          <FiSearch />
        </InputRightAddon>
      </InputGroup>

      {/* {queryText && (
        <Box maxH="70vh" p="0" overflowY="auto">
          <Box px={4}>
            <Box borderTopWidth="1px" pt={2} pb={4}>
              <SearchResults searchResults={searchResults} />
            </Box>
          </Box>
        </Box>
      )} */}
    </Box>
  );
};

export default Search;
