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

export type CommonModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  isLoading?: boolean;
};

//TODO: отменить реквест в клиенте на нажатие по отмене
export const CommonModal = (props: CommonModalProps) => {
  const { isOpen, onConfirm, onCancel, children, title, isLoading } = props;

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent borderRadius={"3px"} w="90%" maxW="500px">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onCancel} isLoading={isLoading} mr={2}>
            Отменить
          </Button>
          <Button onClick={onConfirm} isLoading={isLoading}>
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
