import { ButtonProps, ThemingProps } from "@chakra-ui/react";

export interface IButton {
  onClick?: () => void;
  title?: string;
  type?: ButtonProps["type"];
  colorScheme?: ThemingProps["colorScheme"];
}
