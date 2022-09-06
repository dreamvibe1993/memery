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

  if (graveUtils.isError) {
    return <div>Implement error page</div>;
  }

  if (!graveUtils.grave) {
    return <div>Implement error page</div>;
  }

  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Профиль</Tab>
          <Tab>Подачки</Tab>
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
