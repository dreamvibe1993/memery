import { Center } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { HEADER_HEIGHT } from "../../components/common/Header/Header";
import { SigninCard } from "../../components/user/SigninCard/SigninCard";

export const Login = observer(() => {
  return (
    <Center h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <SigninCard />
    </Center>
  );
});
