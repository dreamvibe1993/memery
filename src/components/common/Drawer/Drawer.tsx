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
import { ReactNode, useContext } from "react";
import { DrawerContext } from "../../../contexts/drawer-context/drawer-context";
import { HeaderLayout } from "../../layouts/HeaderLayout/HeaderLayout";
import { IButton } from "../../../types/interfaces/components/common/IButton";

export type DrawerLeftProps = {
  children: ReactNode;
  title: string;
  cancelButton?: IButton & { additionalAttrs?: any };
  confirmButton?: IButton & { additionalAttrs?: any };
};

export function DrawerLeft(props: DrawerLeftProps) {
  const { isOpen, onClose } = useContext(DrawerContext);
  const { children, cancelButton, confirmButton, title } = props;

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader p={0}>
            <HeaderLayout>
              <DrawerCloseButton />
              <GridItem area="body" as={Center}>
                <Text>{title}</Text>
              </GridItem>
            </HeaderLayout>
          </DrawerHeader>

          <DrawerBody p={5}>{children}</DrawerBody>

          <DrawerFooter justifyContent="space-between">
            {cancelButton && (
              <Button
                onClick={cancelButton.onClick}
                {...cancelButton.additionalAttrs}
              >
                {cancelButton.title || "Отменить"}
              </Button>
            )}
            {confirmButton && (
              <Button
                onClick={confirmButton.onClick}
                {...confirmButton.additionalAttrs}
              >
                {confirmButton.title || "Сохранить"}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
