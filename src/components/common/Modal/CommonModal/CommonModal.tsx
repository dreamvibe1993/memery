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
  confirmButton?: IButton & { form?: string };
  cancelButton?: IButton;
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  onClose: () => void;
};

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
              type={confirmButton.type || "button"}
              form={confirmButton.form}
            >
              {confirmButton.title || "Отправить"}
            </Button>
          )}
          {cancelButton && (
            <Button
              onClick={cancelButton.onClick}
              isLoading={isLoading}
              type={cancelButton.type || "button"}
            >
              {cancelButton.title || "Отмена"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
