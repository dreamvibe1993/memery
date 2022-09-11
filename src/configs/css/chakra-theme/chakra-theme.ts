import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Text: {
      variants: {
        caption: {
          fontSize: 12,
          color: "gray.500",
        },
        drawerLink: {
          fontSize: 18,
          fontStyle: "semibold",
        },
      },
    },
    Input: {
      variants: {
        searchbar: {
          field: {
            border: "1px solid",
            borderColor: "blackAlpha.300",
            borderRadius: "3px",
          },
        },
      },
    },
  },
});
