import axios from "axios";
import { useCallback, useContext } from "react";
import { useErrorHandler } from "react-error-boundary";
import { API_V1_USERS } from "../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../configs/urls/app/app-urls";
import { CommonLoaderContext } from "../../../contexts/common-loader/common-loader";
import { UserCreds } from "../../../types/User";
import userStore from "../../../store/mobx/users/users";
import { useToast } from "@chakra-ui/react";
import { returnSuccessToast } from "../../mappers/toasts/returnSuccessToast";
import { returnErrorToast } from "../../mappers/toasts/returnErrorToast";

export const useLoginUser = () => {
  const toast = useToast();
  const handleError = useErrorHandler();
  const { onOpen: openGlobalPreloader, onClose: closeGlobalPreloader } =
    useContext(CommonLoaderContext);

  const { setLoggedIn, setUser, flushUser } = userStore;

  const login = async (creds: UserCreds) => {
    try {
      openGlobalPreloader();
      const response = await axios.post(
        `${ORIGIN}${API_V1_USERS}/login`,
        creds,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      setLoggedIn(true);
      toast(returnSuccessToast(`Здравствуйте, ${response.data.user.name}! 💓`));
    } catch (e) {
      toast(returnErrorToast(`Либо почта, либо пароль неправильные! 🍅`));
    } finally {
      closeGlobalPreloader();
    }
  };

  const checkIfIsLogged = useCallback(async () => {
    try {
      const response = await axios.get(`${ORIGIN}${API_V1_USERS}/getMe`, {
        withCredentials: true,
      });
      setUser(response.data.user);
      setLoggedIn(true);
      toast(returnSuccessToast(`Вы успешно авторизовались!`));
    } catch (e) {
      setLoggedIn(false);
    }
  }, [setLoggedIn, setUser, toast]);

  const logout = async () => {
    try {
      await axios.post(
        `${ORIGIN}${API_V1_USERS}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoggedIn(false);
      flushUser();
      toast(returnSuccessToast(`Надеюсь, скоро увидимся вновь! 💖`));
    } catch (e) {
      handleError(e);
    }
  };

  return { login, logout, checkIfIsLogged };
};
