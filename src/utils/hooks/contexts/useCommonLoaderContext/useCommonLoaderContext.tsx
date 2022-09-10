import { useDisclosure } from "@chakra-ui/react";
import { memo } from "react";
import { CommonLoaderContext } from "../../../../contexts/common-loader/common-loader";

const CommonLoaderContextWrapper = memo(
  (props: { children: JSX.Element | JSX.Element[] | undefined }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { children } = props;
    return (
      <CommonLoaderContext.Provider value={{ isOpen, onOpen, onClose }}>
        {children}
      </CommonLoaderContext.Provider>
    );
  }
);

export const useCommonLoaderContext = () => {
  return CommonLoaderContextWrapper;
};
