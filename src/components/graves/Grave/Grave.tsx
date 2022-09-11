import {
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useGetGrave } from "../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { GraveGifts } from "./GraveGifts/GraveGifts";
import { GraveProfile } from "./GraveProfile/GraveProfile";

export const Grave = () => {
  const graveUtils = useGetGrave();

  if (graveUtils.isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (!graveUtils.grave) {
    return null;
  }

  return (
    <>
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
