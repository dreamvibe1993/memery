import { Center, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { CommonLoaderContext } from "../../../contexts/common-loader/common-loader";
import { HEADER_HEIGHT } from "../Header/Header";

export const CommonPreloader = () => {
  const { isOpen } = useContext(CommonLoaderContext);
  if (!isOpen) return null;
  return (
    <Center
      h={`calc(100vh - ${HEADER_HEIGHT}px)`}
      pos="fixed"
      w="100%"
      bg="whiteAlpha.700"
      zIndex={60}
    >
      <Spinner />
    </Center>
  );
};
