import { Center } from "@chakra-ui/react";
import { HEADER_HEIGHT } from "../../components/common/Header/Header";
import SigninCard from "../../components/common/SigninCard/SigninCard";

export const Login = () => {
  return (
    <Center h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <SigninCard />
    </Center>
  );
};
