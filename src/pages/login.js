import { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Link from 'next/link';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <>
      <Flex
        //   flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        p={10}
        mb={12}
      >
        <Box minW={{ base: '90%', md: '468px' }}>
          <Box
            fontSize="2xl"
            fontWeight="semibold"
            as="h2"
            // lineHeight="tight"
            color={'gray.500'}
            isTruncated
          >
            Welcome to Daraz! Please login.
          </Box>
          <form>
            <Stack spacing={4} p="1rem">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input type="email" placeholder="Email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link href="#">forgot password?</Link>
                </FormHelperText>
              </FormControl>
            </Stack>
          </form>
        </Box>
        <Box>
          New to us? <Link href="/sign-up">Sign Up</Link>
          <Button
            borderRadius={0}
            type="submit"
            bgColor="mOrange"
            width="full"
            _hover={{ color: 'white' }}
          >
            Login
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
