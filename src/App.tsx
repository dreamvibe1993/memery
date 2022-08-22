import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/common/Header/Header";
import { theme } from "./configs/css/chakra-theme/chakra-theme";
import { Routes } from "./routing/routes";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Routes />
    </ChakraProvider>
  );
}

export default App;
