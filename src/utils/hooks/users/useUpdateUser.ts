import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { API_V1_USERS } from "../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../configs/urls/app/app-urls";
import { returnErrorToast } from "../../mappers/toasts/returnErrorToast";
import { returnSuccessToast } from "../../mappers/toasts/returnSuccessToast";

export const useUpdateUser = () => {
  const toast = useToast();
  const sendResetPasswordLink = async (email: string) => {
    try {
      await axios.post(`${ORIGIN}${API_V1_USERS}/forgotPassword`, {
        email,
      });
      toast(
        returnSuccessToast(
          "Мы прислали вам ссылку для сброса пароля! Проверьте почтовый ящик 🐱"
        )
      );
    } catch (e: any) {
      toast(returnErrorToast(e.message));
      throw new Error();
    }
  };

  const submitNewPassword = async (props: {
    password: string;
    passwordConfirm: string;
    token: string;
  }) => {
    const { password, passwordConfirm, token } = props;
    try {
      await axios.patch(`${ORIGIN}${API_V1_USERS}/resetPassword/${token}`, {
        password,
        passwordConfirm,
      });
      toast(
        returnSuccessToast("Пароль успешно изменен! Войдите с новым паролем 🐱")
      );
    } catch (e: any) {
      toast(returnErrorToast(e.message));
      throw new Error();
    }
  };
  return { sendResetPasswordLink, submitNewPassword };
};
