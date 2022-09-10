import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/common/Header/Header";
import { theme } from "./configs/css/chakra-theme/chakra-theme";
import { Routes } from "./routing/routes";
import { useDrawerContext } from "./utils/hooks/contexts/useDrawerContext/useDrawerContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./components/common/Error/ErrorPage/ErrorPage";

function App() {
  const DrawerContext = useDrawerContext();

  return (
    <ChakraProvider theme={theme}>
      <DrawerContext>
        <Header />
        <ErrorBoundary fallbackRender={ErrorPage}>
          <Routes />
        </ErrorBoundary>
      </DrawerContext>
    </ChakraProvider>
  );
}

export default App;
