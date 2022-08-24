import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Text: {
      variants: {
        caption: {
          fontSize: 12,
          color: "gray.500"
        }
      }
    }
  }
});
