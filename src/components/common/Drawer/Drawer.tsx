import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Drawer,
  DrawerOverlay,
  GridItem,
  Text,
  Center,
} from "@chakra-ui/react";
import { useContext } from "react";
import { DrawerContext } from "../../../contexts/drawer-context/drawer-context";
import { AddGraveForm } from "../../forms/AddGraveForm/AddGraveForm";
import { HeaderLayout } from "../../layouts/HeaderLayout/HeaderLayout";
import graveStore from "../../../store/mobx/graves/graves";

export function DrawerLeft() {
  const { isOpen, onClose } = useContext(DrawerContext);
  const { api } = graveStore;

  const reloadGraves = async () => {
    await api.reload();
    onClose();
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader p={0}>
            <HeaderLayout>
              <DrawerCloseButton />
              <GridItem area="body" as={Center}>
                <Text>Создать могилу</Text>
              </GridItem>
            </HeaderLayout>
          </DrawerHeader>

          <DrawerBody p={5}>
            <AddGraveForm handleAfterSubmit={reloadGraves} />
          </DrawerBody>

          <DrawerFooter justifyContent="space-between">
            <Button variant="outline" mr={3} onClick={onClose}>
              Отменить
            </Button>
            <Button type="submit" form="add-graves-form">
              Сохранить
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
