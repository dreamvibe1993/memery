import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/common/Header/Header";
import { theme } from "./configs/css/chakra-theme/chakra-theme";
import { Routes } from "./routing/routes";
import { useDrawerContext } from "./utils/hooks/contexts/useDrawerContext/useDrawerContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./pages/Error/ErrorPage/ErrorPage";
import { useCommonLoaderContext } from "./utils/hooks/contexts/useCommonLoaderContext/useCommonLoaderContext";
import { CommonPreloader } from "./components/common/CommonPreloader/CommonPreloader";
import { DrawerLeft } from "./components/common/Drawer/Drawer";
import { DrawerLinksList } from "./components/common/Drawer/DrawerLinksList/DrawerLinksList";
import { AuthWrapper } from "./components/hocs/AuthWrapper/AuthWrapper";

//TODO: отменить реквест в клиенте на нажатие по отмене
//TODO: хендл ошибок в разных местах, хендл кодов


function App() {
  const DrawerContext = useDrawerContext();
  const CommonPreloaderContext = useCommonLoaderContext();

  return (
    <ChakraProvider theme={theme}>
      <DrawerContext>
        <Header />
        <DrawerLeft title="Навигация">
          <DrawerLinksList />
        </DrawerLeft>
        <CommonPreloaderContext>
          <CommonPreloader />
          <ErrorBoundary fallbackRender={ErrorPage}>
            <AuthWrapper>
              <Routes />
            </AuthWrapper>
          </ErrorBoundary>
        </CommonPreloaderContext>
      </DrawerContext>
    </ChakraProvider>
  );
}

export default App;
