import { Center, GridItem, Switch, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { DrawerContext } from "../../../contexts/drawer-context/drawer-context";
import { HeaderLayout } from "../../layouts/HeaderLayout/HeaderLayout";

export const HEADER_HEIGHT = 61;

export const Header = () => {
  const { toggleColorMode } = useColorMode();
  const { onOpen: openDrawer } = useContext(DrawerContext);

  return (
    <HeaderLayout>
      <GridItem area="body"></GridItem>
      <GridItem as={Center} area="switch">
        <Switch size="md" onChange={toggleColorMode} />
      </GridItem>
      <GridItem
        area="burger"
        p={4}
        color="gray.400"
        as={Center}
        css={{
          svg: {
            width: "100%",
            height: "100%",
          },
        }}
        onClick={openDrawer}
      >
        <GiHamburgerMenu />
      </GridItem>
    </HeaderLayout>
  );
};
