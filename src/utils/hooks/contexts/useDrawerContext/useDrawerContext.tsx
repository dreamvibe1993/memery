import { useDisclosure } from "@chakra-ui/react";
import { memo } from "react";
import { DrawerContext } from "../../../../contexts/drawer-context/drawer-context";

const DrawerContextWrapper = memo(
  (props: { children: JSX.Element | JSX.Element[] | undefined }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { children } = props;
    return (
      <DrawerContext.Provider value={{ isOpen, onOpen, onClose }}>
        {children}
      </DrawerContext.Provider>
    );
  }
);

export const useDrawerContext = () => {
  return DrawerContextWrapper;
};
