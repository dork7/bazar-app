import { useContext, useRef, useState } from 'react';
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
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaMobile } from 'react-icons/fa';
import NotificationContext from '@/store/NotificationContext';
import { signUp } from '@/utils/api.utils';
import { useRouter } from 'next/router';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaMobile = chakra(FaMobile);

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const formSubmit = async (e) => {
    e.preventDefault();
    notificationCtx.showNotification({
      title: 'Signing up 😁',
      message: 'Wait please',
      status: 'pending',
    });
    const formData = {
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await fetch(`/api/sign-up`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        return response.json().then((data) => {
          notificationCtx.showNotification({
            title: 'Error 😐',
            message: data.message || 'Masla ho gya ha',
            status: 'error',
          });
        });
      }

      const data = await response.json();
      notificationCtx.showNotification({
        title: 'Success 😍',
        message: 'Ho gya, Mubarik ho',
        status: 'success',
      });
      router.push(`/login?email=${emailRef.current.value}`);
    } catch (err) {
      console.log('err :>> ', err);
      notificationCtx.showNotification({
        title: 'Error 😐',
        message: err.message || 'Masla ho gya ha',
        status: 'error',
      });
    }
  };

  return (
    <>
      <form onSubmit={formSubmit}>
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
              Welcome to Daraz! Sign up
            </Box>
            <Stack spacing={4} p="1rem">
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email address"
                    ref={emailRef}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaMobile color="gray.300" />
                  </InputLeftElement>
                  <Input placeholder="Phone Number" ref={phoneRef} />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
          </Box>
          <Box>
            Already a member?
            <Link href="/login"> Login</Link>
            <Button
              borderRadius={0}
              type="submit"
              bgColor="mOrange"
              width="full"
              _hover={{ color: 'white' }}
            >
              Sign up
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
};

export default SignUp;
