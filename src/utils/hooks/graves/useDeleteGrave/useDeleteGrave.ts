import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { API_V1_GRAVES } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { CommonLoaderContext } from "../../../../contexts/common-loader/common-loader";
import { Grave } from "../../../../types/Grave";
import { UserRoles } from "../../../../types/User";
import { returnErrorToast } from "../../../mappers/toasts/returnErrorToast";
import { returnSuccessToast } from "../../../mappers/toasts/returnSuccessToast";
import { useReturnUserStore } from "../../mobx/users/useReturnUserStore";

export const useDeleteGrave = () => {
  const toast = useToast();
  const { user } = useReturnUserStore();
  const { onOpen: setLoadingStart, onClose: setLoadingFinished } =
    useContext(CommonLoaderContext);

  const deleteGrave = async (grave: Grave) => {
    if (user?._id !== grave.madeBy.id && user?.role !== UserRoles.admin) {
      return console.error("You don't have rights to delete a grave.");
    }

    try {
      setLoadingStart();
      await axios.delete(`${ORIGIN}${API_V1_GRAVES}/${grave._id}`, {
        withCredentials: true,
      });
      toast(returnSuccessToast("Могила успешно удалена!"));
    } catch (e: any) {
      toast(returnErrorToast(e));
    } finally {
      setLoadingFinished();
    }
  };

  return { deleteGrave };
};
