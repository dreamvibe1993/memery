import axios from "axios";
import { FileExtended } from "../../comperssors/photos/compressPhotos";

export const updatePhotos = async (
  photos: Array<FileExtended>,
  url: string
) => {
  const formData = new FormData();
  photos.forEach((file: FileExtended) => {
    console.log(file.file)
    formData.append("multi-files", file.file, file.file.name);
  });
  return await axios
    .post(url, formData, {
    //   withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    })
    .catch((e) => {
      console.error("Error while uploading photos: ", e);
    });
};
