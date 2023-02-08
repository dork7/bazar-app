import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import CategoryTabs from '.';

const TabStack = () => {
  return (
    <Flex w="70%" justify="space-between" gap={4}>
      <CategoryTabs title="Mart" />
      <CategoryTabs title="Mart" />
      <CategoryTabs title="Mart" />
      <CategoryTabs title="Mart" />
    </Flex>
  );
};

export default TabStack;
