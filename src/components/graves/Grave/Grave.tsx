import {
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DrawerContext } from "../../../contexts/drawer-context/drawer-context";
import { useGetGrave } from "../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { DrawerLeft } from "../../common/Drawer/Drawer";
import { GraveGifts } from "./GraveGifts/GraveGifts";
import { GraveProfile } from "./GraveProfile/GraveProfile";

export const Grave = () => {
  const graveUtils = useGetGrave();
  const { onClose } = useContext(DrawerContext);

  if (graveUtils.isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  // if (graveUtils.isError) {
  //   return <div>Implement error page</div>;
  // }

  // if (!graveUtils.grave) {
  //   return <div>Implement error page</div>;
  // }

  return (
    <>
      <DrawerLeft title="Навигация">
        <Link to="/" onClick={onClose}>
          Главная
        </Link>
      </DrawerLeft>
      <Tabs isFitted variant="enclosed" mt={3}>
        <TabList>
          <Tab>Профиль</Tab>
          <Tab>Подарки</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GraveProfile {...graveUtils} />
          </TabPanel>
          <TabPanel>
            <GraveGifts {...graveUtils} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
