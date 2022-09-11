import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { API_V1_USERS } from "../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../configs/urls/app/app-urls";
import { CommonLoaderContext } from "../../../contexts/common-loader/common-loader";
import { UserCreds } from "../../../types/User";
import { returnSuccessToast } from "../../mappers/toasts/returnSuccessToast";

export const useRegisterUser = () => {
  const handleError = useErrorHandler();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen: openGlobalPreloader, onClose: closeGlobalPreloader } =
    useContext(CommonLoaderContext);

  const register = async (creds: UserCreds) => {
    try {
      setIsLoading(true);
      openGlobalPreloader();
      await axios.post(`${ORIGIN}${API_V1_USERS}/signup`, creds);
      toast(returnSuccessToast(`Вы успешно зарегистрировались! ☑️`))
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
      closeGlobalPreloader();
    }
  };

  return {
    register,
    isLoading,
  };
};
