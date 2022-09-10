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
      },
    },
    Input: {
      variants: {
        searchbar: {
          field: {
            border: "1px solid transparent",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderColor: "gray.400",
            borderRadius: '1px'
          },
        },
      },
    },
  },
});
