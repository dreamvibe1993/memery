import axios from "axios";
import { useErrorHandler } from "react-error-boundary";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../types/Grave";

export const useUpdateGrave = () => {
  const handleError = useErrorHandler();

  const updateGraveMessages = async (grave: Grave, newMessage: string) => {
    try {
      return axios.patch(`${ORIGIN}${API_V1_GRAVES}/${grave._id}`, {
        chatLogs: [...grave.chatLogs, newMessage],
      });
    } catch (e) {
      console.error(e);
      handleError(e);
    }
  };

  const updateGraveGifts = async (grave: Grave) => {
    try {
      return axios.patch(`${ORIGIN}${API_V1_GRAVES}/${grave._id}`, grave);
    } catch (e) {
      console.error(e);
      handleError(e);
    }
  };

  return { updateGraveMessages, updateGraveGifts };
};

//TODO: client with error handling
// error boundary with мужик из краза
// убрать ненужные деструктуризации?
