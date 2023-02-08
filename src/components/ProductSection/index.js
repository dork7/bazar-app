import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '../ProductCard';

const ProductSection = (props) => {
  const productList = [
    {
      isNew: false,
      imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
      name: 'Wayfarer Classic',
      price: 4.5,
      rating: 4.2,
      numReviews: 34,
    },
    {
      isNew: false,
      imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
      name: 'Wayfarer Classic',
      price: 4.5,
      rating: 4.2,
      numReviews: 34,
    },
    {
      isNew: false,
      imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
      name: 'Wayfarer Classic',
      price: 4.5,
      rating: 4.2,
      numReviews: 34,
    },
    {
      isNew: false,
      imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
      name: 'Wayfarer Classic',
      price: 4.5,
      rating: 4.2,
      numReviews: 34,
    },
    {
      isNew: false,
      imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
      name: 'Wayfarer Classic',
      price: 4.5,
      rating: 4.2,
      numReviews: 34,
    },
    {
      isNew: false,
      imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
      name: 'Wayfarer Classic',
      price: 4.5,
      rating: 4.2,
      numReviews: 34,
    },
    {
      isNew: false,
      imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
      name: 'Wayfarer Classic',
      price: 4.5,
      rating: 4.2,
      numReviews: 34,
    },
  ];
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
