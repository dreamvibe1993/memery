import { ButtonProps } from "@chakra-ui/react";

export interface IButton {
  onClick?: () => void;
  title?: string;
  type?: ButtonProps['type'];
}
