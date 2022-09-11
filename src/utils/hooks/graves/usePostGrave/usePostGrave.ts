import axios from "axios";
import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import {
  API_V1_GRAVES,
  API_V1_PHOTOS,
} from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { updatePhotos } from "../../../api/photos/photos";
import { FileExtended } from "../../../comperssors/photos/compressPhotos";
import { mapGraveToBackDTO } from "../../../mappers/grave/mapGraveToBackDTO";

export type PostGraveFormData = {
  name: string;
  born: string;
  died: string;
  lastWords: string;
  photos: Array<FileExtended>;
};

export type UsePostGraveType = {
  postNewGrave: (data: PostGraveFormData) => void;
  isLoading: boolean;
};

export const usePostGrave = (): UsePostGraveType => {
  const [isLoading, setIsLoading] = useState(false);
  const handleError = useErrorHandler();

  const postNewGrave = async (data: PostGraveFormData) => {
    const apiRoute = ORIGIN + API_V1_PHOTOS + "/graves";
    setIsLoading(true);
    try {
      const res = await updatePhotos(data.photos, apiRoute);
      if (!res?.data?.photos)
        throw new Error("Ты похоже не залогинился, друг...");
      data.photos = res.data.photos;
      const readyToPost = mapGraveToBackDTO(data);
      const response = await axios.post(
        `${ORIGIN}${API_V1_GRAVES}`,
        readyToPost,
        // {
        //   withCredentials: true,
        // }
      );
      return response;
    } catch (e) {
      console.error(e);
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { postNewGrave, isLoading };
};
