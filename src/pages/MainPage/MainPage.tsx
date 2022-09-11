import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { HEADER_HEIGHT } from "../../components/common/Header/Header";
import { routes } from "../../configs/urls/app/app-urls";

export const MainPage = observer((): JSX.Element => {
  return (
    <Center h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <VStack>
        <Heading as="h1">M_E_M_E_R_Y</Heading>
        <Text>Похорони их всех...</Text>
        <Button as={Link} to={routes.registration.root}>
          Регистрация
        </Button>
        <Button as={Link} to={routes.login.root}>
          Авторизация
        </Button>
        <Button as={Link} to={routes.graves.root}>
          На кладбище
        </Button>
      </VStack>
    </Center>
  );
});
