import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IButton } from "../../../../types/interfaces/components/common/IButton";

export type CommonModalProps = {
  isOpen: boolean;
  confirmButton?: IButton;
  cancelButton?: IButton;
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  onClose: () => void;
};

//TODO: отменить реквест в клиенте на нажатие по отмене
export const CommonModal = (props: CommonModalProps) => {
  const {
    isOpen,
    confirmButton,
    cancelButton,
    children,
    title,
    isLoading,
    onClose,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={"3px"} w="90%" maxW="500px">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {confirmButton && (
            <Button
              onClick={confirmButton.onClick}
              isLoading={isLoading}
              mr={2}
            >
              {confirmButton.title || "Отправить"}
            </Button>
          )}
          {cancelButton && (
            <Button onClick={cancelButton.onClick} isLoading={isLoading}>
              {cancelButton.title || "Отмена"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
