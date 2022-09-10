import { createContext } from "react";
import { UseDisclosureReturnType } from "../../types/common/UseDisclosureReturnType";

export const CommonLoaderContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
} as UseDisclosureReturnType);
