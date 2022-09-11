import { UseToastOptions } from "@chakra-ui/react";

export const returnSuccessToast = (what: string): UseToastOptions => ({
  title: "Ура!",
  status: "success",
  duration: 9000,
  isClosable: true,
  description: what,
});
