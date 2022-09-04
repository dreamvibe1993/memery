import axios from "axios";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { Grave } from "../../../../types/Grave";

export const useUpdateGrave = () => {
  const updateGraveMessages = async (grave: Grave, newMessage: string) => {
    return axios.patch(`${ORIGIN}${API_V1_GRAVES}/${grave._id}`, {
      chatLogs: [...grave.chatLogs, newMessage],
    });
  };

  return { updateGraveMessages };
};
