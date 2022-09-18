import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useHistory } from "react-router-dom";
import {
  API_V1_GRAVES,
  API_V1_PHOTOS,
} from "../../../../configs/urls/api/api-urls";
import { ORIGIN, routes } from "../../../../configs/urls/app/app-urls";
import { Photo } from "../../../../types/Photo";
import { updatePhotos } from "../../../api/photos/photos";
import { FileExtended } from "../../../comperssors/photos/compressPhotos";
import { mapGraveToBackDTO } from "../../../mappers/grave/mapGraveToBackDTO";
import { returnErrorToast } from "../../../mappers/toasts/returnErrorToast";
import { returnSuccessToast } from "../../../mappers/toasts/returnSuccessToast";

export type PostGraveFormData = {
  name: string;
  born: string;
  died: string;
  lastWords: string;
  photos: Array<FileExtended>;
};

export type UsePostGraveType = {
  postNewGrave: (data: PostGraveFormData) => Promise<any>;
  isLoading: boolean;
};

export const usePostGrave = (): UsePostGraveType => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const postNewGrave = async (data: PostGraveFormData) => {
    const apiRoute = ORIGIN + API_V1_PHOTOS + "/graves";
    setIsLoading(true);
    try {
      const res = await updatePhotos(data.photos, apiRoute);
      if (!res?.data?.photos) {
        toast(returnErrorToast("Похоже, вы не вошли в аккаунт!"));
        history.push(routes.login.root);
        return;
      }
      data.photos = res.data.photos.map((photo: Photo, index: number) => {
        return {
          url: photo.url,
          isAvatar: index === 0,
        };
      });
      const readyToPost = mapGraveToBackDTO(data);
      const response = await axios.post(
        `${ORIGIN}${API_V1_GRAVES}`,
        readyToPost,
        {
          withCredentials: true,
        }
      );
      toast(returnSuccessToast("Могила успешно создана!"));

      return response;
    } catch (e) {
      console.error(e);
      toast(returnErrorToast("Похоже, вы не вошли в аккаунт!"));
    } finally {
      setIsLoading(false);
    }
  };

  return { postNewGrave, isLoading };
};
