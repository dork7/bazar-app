import React from "react";

import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";

const SearchResults = ({ searchResults, setSearchResults }) => {
  return (
    <Grid gridRowGap="1rem">
      {searchResults?.map(({ name, price, imageURL, productId }) => (
        <Link
          href={`/productDetails/${productId}`}
          onClick={() => setSearchResults([])}
        >
          <Box
            key={productId}
            _hover={{
              background: "mOrange",
              color: "white",
              cursor: "pointer",
            }}
            p=".5rem 1rem"
          >
            <Grid
              sx={{
                gridTemplateColumns: "50px 1fr",
                gridColumnGap: "1rem",
                // height: "70px",
                overflow: "hidden",
              }}
            >
              <Box>
                <Image
                  src={imageURL}
                  alt={`Picture of $.name}`}
                  width={120}
                  height={120}
                  // layout="responsive"
                  // showThumbs={false}
                  // style={{ objectFit: "cover" }}
                />
              </Box>

              <VStack align="start">
                <Text noOfLines={1}>{name}</Text>
                <Text noOfLines={1}>Rs. {price}</Text>
              </VStack>
            </Grid>
          </Box>
        </Link>
      ))}
    </Grid>
  );
};

export default SearchResults;
