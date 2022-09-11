import { Center } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { HEADER_HEIGHT } from "../../components/common/Header/Header";
import { SignupCard } from "../../components/common/SignupCard/SignupCard";

export const Registration = observer(() => {
  return (
    <Center h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <SignupCard />
    </Center>
  );
});
