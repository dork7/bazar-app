import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const Logout = () => {
  const router = useRouter();
  localStorage.setItem('user', JSON.stringify({}));
  router.push('/');

  return (
    <Flex justify="center" w={'100vw'} h={'80vh'} align="center">
      <Spinner size="xl" />
    </Flex>
  );
};

export default Logout;
