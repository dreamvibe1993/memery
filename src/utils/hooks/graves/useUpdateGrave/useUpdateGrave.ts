import { useToast, UseToastOptions } from "@chakra-ui/react";
import axios from "axios";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../types/Grave";
import { returnErrorToast } from "../../../mappers/toasts/returnErrorToast";
import { returnSuccessToast } from "../../../mappers/toasts/returnSuccessToast";

export const useUpdateGrave = () => {
  const toast = useToast();

  const updateGraveMessages = async (grave: Grave, newMessage: string) => {
    try {
      const result = await axios.patch(
        `${ORIGIN}${API_V1_GRAVES}/${grave._id}`,
        {
          chatLogs: [...grave.chatLogs, newMessage],
        },
        {
          withCredentials: true,
        }
      );
      toast(returnSuccessToast("Вы успешно добавили сообщение! 🐸"));
      return result;
    } catch (e: any) {
      console.error(e);
      toast(returnErrorToast(e.message));
    }
  };

  const updateGraveGifts = async (grave: Grave) => {
    try {
      const result = await axios.patch(
        `${ORIGIN}${API_V1_GRAVES}/${grave._id}`,
        grave,
        {
          withCredentials: true,
        }
      );
      toast(returnSuccessToast("Вы успешно добавили подарок! 🐸"));
      return result;
    } catch (e: any) {
      console.error(e);
      toast(returnErrorToast(e.message));
    }
  };

  const updateGrave = async (grave: Partial<Grave>) => {
    try {
      const result = await axios.patch(
        `${ORIGIN}${API_V1_GRAVES}/${grave._id}`,
        grave,
        {
          withCredentials: true,
        }
      );
      toast(returnSuccessToast("Могила обновлена! 🐸"));
      return result;
    } catch (e: any) {
      console.error(e);
      toast(returnErrorToast(e.message));
    }
  };

  return { updateGraveMessages, updateGraveGifts, updateGrave };
};

// убрать ненужные деструктуризации?
