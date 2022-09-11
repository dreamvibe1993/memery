import {
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

export type InputWithErrorStateProps = {
  isInvalid: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  type: string;
  placeholder?: string;
  errorMessage: string | undefined;
  isRequired?: boolean;
  label?: string;
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
    label,
    isRequired,
  } = props;
  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      {label && <FormLabel htmlFor="name">{label}</FormLabel>}
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
