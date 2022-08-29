import axios from "axios";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import {
  API_V1_GRAVES,
  API_V1_PHOTOS,
} from "../../../../configs/urls/api/api-urls";
import { mapGraveToBackDTO } from "../../../mappers/grave/mapGraveToBackDTO";
import { updatePhotos } from "../../../api/photos/photos";
import { FileExtended } from "../../../comperssors/photos/compressPhotos";

export type PostGraveFormData = {
  name: string;
  born: string;
  died: string;
  lastWords: string;
  photos: Array<FileExtended>;
};

export type UsePostGraveType = {
  postNewGrave: (data: PostGraveFormData) => void;
};

export const usePostGrave = (): UsePostGraveType => {
  const postNewGrave = async (data: PostGraveFormData) => {
    const apiRoute = ORIGIN + API_V1_PHOTOS + "/graves";
    console.log(data);
    try {
      const res = await updatePhotos(data.photos, apiRoute);
      data.photos = res?.data?.photos;
      console.log(data.photos);
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
    }
  };

  return { postNewGrave };
};
