import { FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";

export type TextareaWithErrorStateProps = {
  isInvalid: boolean;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  name: string;
  placeholder: string;
  errorMessage: string | undefined;
};

export const TextareaWithErrorState = (props: TextareaWithErrorStateProps) => {
  const { isInvalid, handleChange, value, name, placeholder, errorMessage } =
    props;
  return (
    <FormControl isInvalid={isInvalid}>
      {/* <FormLabel htmlFor="name">Имя</FormLabel> */}
      <Textarea
        placeholder={placeholder}
        id={name}
        name={name}
        onChange={handleChange}
        resize="none"
        value={value}
        required
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
