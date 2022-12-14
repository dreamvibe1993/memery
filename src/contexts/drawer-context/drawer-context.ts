import { createContext } from "react";
import { UseDisclosureReturnType } from "../../types/common/UseDisclosureReturnType";

export const DrawerContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
} as UseDisclosureReturnType);
