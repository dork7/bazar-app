import { NumberInput } from '@/components/Inputs/NumberInput';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import React from 'react';

const AddProduct = () => {
  return (
    <>
      <Box
        fontSize="2xl"
        fontWeight="semibold"
        as="h2"
        // lineHeight="tight"
        color={'gray.500'}
        isTruncated
      >
        Add Product
      </Box>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={2}
        backgroundColor="whiteAlpha.900"
        p={6}
        w={'60vw'}
      >
        <FormControl isRequired>
          <FormLabel>Product name</FormLabel>
          <Input placeholder="Product name" />
        </FormControl>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <NumberInput min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Number of Reviews</FormLabel>
          <Input placeholder="" />
        </FormControl>
        <GridItem colSpan={2}>
          <FormControl as="fieldset">
            <FormLabel as="legend">Ratings</FormLabel>
            <RadioGroup defaultValue="3">
              <HStack spacing="24px">
                <Radio value="1">Ok</Radio>
                <Radio value="2">Good</Radio>
                <Radio value="3">Very Good</Radio>
                <Radio value="4">Best</Radio>
                <Radio value="5">Unmatchable</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </GridItem>
        <GridItem colStart={2} p={2}>
          <Button
            borderRadius={0}
            type="submit"
            bgColor="mOrange"
            width="full"
            _hover={{ color: 'white' }}
          >
            Publish Product
          </Button>
        </GridItem>
      </Grid>
    </>
  );
};

export default AddProduct;
