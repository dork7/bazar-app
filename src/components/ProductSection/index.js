import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '../ProductCard';

const ProductSection = (props) => {
  const productList = props.products;
  const { title } = props;
  return (
    <>
      <Flex
        w="70%"
        justify="space-between"
        gap={4}
        // bgColor="gray.100"
        flexDir={'column'}
      >
        <Box
          fontSize="2xl"
          fontWeight="semibold"
          as="h2"
          // lineHeight="tight"
          color={'gray.500'}
          isTruncated
        >
          {title}
        </Box>
        <Grid templateColumns="repeat(6, 1fr)" gap={2}>
          {productList.map((item, idx) => (
            <ProductCard data={item} key={idx} />
          ))}
        </Grid>
      </Flex>
    </>
  );
};

export default ProductSection;
