import { useContext } from "react";
import { DrawerContext } from "../../../contexts/drawer-context/drawer-context";
import {
  DrawerLayout,
  DrawerProps,
} from "../../layouts/DrawerLayout/DrawerLayout";

export function DrawerLeft(props: DrawerProps) {
  const { isOpen, onClose } = useContext(DrawerContext);
  const { children, cancelButton, confirmButton, title } = props;

  return (
    <DrawerLayout
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      cancelButton={cancelButton}
      confirmButton={confirmButton}
    >
      {children}
    </DrawerLayout>
  );
}
