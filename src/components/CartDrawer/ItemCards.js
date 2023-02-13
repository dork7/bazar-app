import {
  Badge,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const ItemCards = (props) => {
  const { item: data, removeItem } = props;
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      //   maxW="200"
      //   maxH="250"
      shadow="xl"
      py={2}
      m={2}
      border="1px solid"
      borderColor="gray.200"
      //   display="flex"
      //   alignItems={"center"}
      //   justifyContent="center"
      //   flexDir="row"
    >
      <Box
        h={120}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
        flexDir="columns"
      >
        <Image
          src={data.imageURL}
          alt={`Picture of ${data.name}`}
          width={120}
          height={120}
          layout="responsive"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box p="6">
        <Flex
          mt="4"
          justifyContent="space-between"
          alignContent="center"
          flexDir={"column"}
        >
          <Box
            fontSize="md"
            fontWeight="semibold"
            as="h6"
            lineHeight="tight"
            isTruncated
          >
            {data.name}
          </Box>
          <Box
            fontSize="sm"
            color={useColorModeValue("gray.800", "white")}
            fontSize="md"
            fontWeight="semibold"
            as="h6"
          >
            <Box as="span" color={"gray.600"} fontSize="md">
              Rs.
            </Box>
            {data.price} x {data.quantity} = {data.price * data.quantity}
          </Box>
          <IconButton
            border="1px solid"
            borderColor="gray.200"
            // fontSize="20px"
            _hover={{
              background: "white",
              color: "mOrange",
            }}
            onClick={() => removeItem(data.productId)}
            pt={1}
          >
            <AiOutlineDelete />
          </IconButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default ItemCards;
