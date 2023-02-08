const {
  HStack,
  Button,
  Input,
  useNumberInput,
  Text,
} = require('@chakra-ui/react');

export function NumberInput({ title }) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Text color={'gray.500'} fontWeight={300} fontSize={'lg'}>
        {title}
      </Text>
      <Button {...dec}>-</Button>
      <Input {...input} w={20} />
      <Button {...inc}>+</Button>
    </HStack>
  );
}
