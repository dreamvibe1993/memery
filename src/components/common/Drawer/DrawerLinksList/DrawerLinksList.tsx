import { VStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../../configs/urls/app/app-urls";
import { DrawerContext } from "../../../../contexts/drawer-context/drawer-context";

const DELAY_IN_MS = 250;

export const DrawerLinksList = () => {
  const { onClose } = useContext(DrawerContext);

  const closeIn = (ms: number) => {
    const timeoutId = setTimeout(() => {
      onClose();
      clearTimeout(timeoutId);
    }, ms);
  };

  return (
    <VStack>
      <Text
        variant="drawerLink"
        as={Link}
        to={routes.graves.root}
        onClick={() => closeIn(DELAY_IN_MS)}
      >
        Могилы
      </Text>
      <Text
        variant="drawerLink"
        as={Link}
        to={routes.registration.root}
        onClick={() => closeIn(DELAY_IN_MS)}
      >
        Регистрация
      </Text>
      <Text
        variant="drawerLink"
        as={Link}
        to={routes.login.root}
        onClick={() => closeIn(DELAY_IN_MS)}
      >
        Авторизация
      </Text>
    </VStack>
  );
};
