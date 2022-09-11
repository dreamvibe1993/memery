import { UseToastOptions } from "@chakra-ui/react";

export const returnErrorToast = (what: string): UseToastOptions => ({
  title: "Упс!",
  status: "error",
  duration: 9000,
  isClosable: true,
  description: what,
});
