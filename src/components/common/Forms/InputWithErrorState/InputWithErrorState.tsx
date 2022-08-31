import { FormControl, Input, FormErrorMessage } from "@chakra-ui/react";

export type InputWithErrorStateProps = {
  isInvalid: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string | undefined;
};

export const InputWithErrorState = (props: InputWithErrorStateProps) => {
  const {
    isInvalid,
    handleChange,
    value,
    name,
    type,
    placeholder,
    errorMessage,
  } = props;
  return (
    <FormControl isInvalid={isInvalid}>
      {/* <FormLabel htmlFor="name">Имя</FormLabel> */}
      <Input
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};


