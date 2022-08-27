import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/common/Header/Header";
import { theme } from "./configs/css/chakra-theme/chakra-theme";
import { Routes } from "./routing/routes";
import { useDrawerContext } from "./utils/hooks/contexts/useDrawerContext/useDrawerContext";

function App() {
  const DrawerContext = useDrawerContext();

  return (
    <ChakraProvider theme={theme}>
      <DrawerContext>
        <Header />
        <Routes />
      </DrawerContext>
    </ChakraProvider>
  );
}

export default App;
