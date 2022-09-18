import { Button, ButtonProps, Input, Text } from "@chakra-ui/react";
import styled from "styled-components";

export const ButtonWithInput = (
  props: {
    text: string;
    handler: React.ChangeEventHandler<HTMLInputElement> | undefined;
  } & ButtonProps
) => {
  const { handler, ...otherProps } = props;
  return (
    <Button w="100%" {...otherProps}>
      <Text>{props.text}</Text>
      <FileInput
        type="file"
        accept="image/*"
        multiple
        onChange={handler}
        opacity={0}
        pos
      />
    </Button>
  );
};

const FileInput = styled(Input)`
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
