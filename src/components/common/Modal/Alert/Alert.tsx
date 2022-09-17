import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { CommonModalProps } from "../CommonModal/CommonModal";

export const Alert = (props: CommonModalProps) => {
  const {
    isOpen,
    confirmButton,
    cancelButton,
    children,
    title,
    isLoading,
    onClose,
  } = props;

  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent mx={3}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            {cancelButton && (
              <Button
                ref={cancelRef}
                onClick={cancelButton.onClick}
                isLoading={isLoading}
                colorScheme={cancelButton.colorScheme}
              >
                {cancelButton.title}
              </Button>
            )}
            {confirmButton && (
              <Button
                ml={3}
                onClick={confirmButton.onClick}
                colorScheme={confirmButton.colorScheme || "red"}
              >
                {confirmButton.title}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
