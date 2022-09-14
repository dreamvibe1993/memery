import { Center } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { HEADER_HEIGHT } from "../../components/common/Header/Header";
import { PassChangeCard } from "../../components/user/PassChangeCard/PassChangeCard";

export const PasswordChange = observer(() => {
  return (
    <Center h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <PassChangeCard />
    </Center>
  );
});
