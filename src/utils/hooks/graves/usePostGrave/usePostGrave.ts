import axios from "axios";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import {
  API_V1_GRAVES,
  API_V1_PHOTOS,
} from "../../../../configs/urls/api/api-urls";
import { mapGraveToBackDTO } from "../../../mappers/grave/mapGraveToBackDTO";
import { updatePhotos } from "../../../api/photos/photos";
import { FileExtended } from "../../../comperssors/photos/compressPhotos";
import { useState } from "react";

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
  const postNewGrave = async (data: PostGraveFormData) => {
    const apiRoute = ORIGIN + API_V1_PHOTOS + "/graves";
    setIsLoading(true);
    try {
      const res = await updatePhotos(data.photos, apiRoute);
      data.photos = res?.data?.photos;
      const readyToPost = mapGraveToBackDTO(data);
      const response = await axios.post(
        `${ORIGIN}${API_V1_GRAVES}`,
        readyToPost
        // {
        //   withCredentials: true,
        // }
      );
      return response;
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { postNewGrave, isLoading };
};
