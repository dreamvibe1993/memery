import { createContext } from "react";

type UseDisclosureReturnType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle?: () => void;
  isControlled?: boolean;
  getButtonProps?: (props?: any) => any;
  getDisclosureProps?: (props?: any) => any;
};

export const DrawerContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
} as UseDisclosureReturnType);
