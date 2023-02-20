import { Box, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import ProductCard from "../ProductCard";
import styles from "./products.module.css";

const ProductSection = (props) => {
  const { title, isLoading, products } = props;
  const productList = products ?? [];
  return (
    <>
      <Flex w="70%" justify="space-between" gap={4} flexDir={"column"}>
        <Box
          fontSize="2xl"
          fontWeight="semibold"
          as="h2"
          color={"gray.500"}
          isTruncated
          pb={4}
        >
          {title}
        </Box>
        {isLoading ? (
          <Flex justify="center">
            <Spinner size="lg" />
          </Flex>
        ) : (
          // <Grid templateColumns="repeat(6, 1fr)" gap={2} mb={4} py={4}>
          <Box className={styles.productGrid}>
            {productList?.length < 1 ? (
              <Box
                fontSize="2xl"
                as="h2"
                color={"gray.400"}
                w={"70vw"}
                display={"flex"}
                justifyContent="center"
                alignItems="center"
                alignContent="center"
              >
                Sorry, no product found ...😔
              </Box>
            ) : (
              productList.map((item, idx) => (
                <ProductCard data={item} key={idx} />
              ))
            )}
          </Box>
        )}
      </Flex>
    </>
  );
};

export default ProductSection;
