import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/common/Header/Header";
import { theme } from "./configs/css/chakra-theme/chakra-theme";
import { Routes } from "./routing/routes";
import { useDrawerContext } from "./utils/hooks/contexts/useDrawerContext/useDrawerContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./components/common/Error/ErrorPage/ErrorPage";
import { useCommonLoaderContext } from "./utils/hooks/contexts/useCommonLoaderContext/useCommonLoaderContext";
import { CommonPreloader } from "./components/common/CommonPreloader/CommonPreloader";

function App() {
  const DrawerContext = useDrawerContext();
  const CommonPreloaderContext = useCommonLoaderContext();

  return (
    <ChakraProvider theme={theme}>
      <DrawerContext>
        <Header />
        <CommonPreloaderContext>
          <CommonPreloader />
          <ErrorBoundary fallbackRender={ErrorPage}>
            <Routes />
          </ErrorBoundary>
        </CommonPreloaderContext>
      </DrawerContext>
    </ChakraProvider>
  );
}

export default App;
