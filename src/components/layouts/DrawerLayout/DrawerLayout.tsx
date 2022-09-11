import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  GridItem,
  Center,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  UseDisclosureProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IButton } from "../../../types/interfaces/components/common/IButton";
import { HeaderLayout } from "../HeaderLayout/HeaderLayout";

export type DrawerProps = {
  children: ReactNode;
  title: string;
  cancelButton?: IButton & { additionalAttrs?: any };
  confirmButton?: IButton & { additionalAttrs?: any };
};

export function DrawerLayout(
  props: DrawerProps & Required<Pick<UseDisclosureProps, "isOpen" | "onClose">>
) {
  const { children, cancelButton, confirmButton, title, isOpen, onClose } =
    props;

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
