import imageCompression from "browser-image-compression";
import { Photo } from "../../../types/Photo";

export type FileExtended = {
  file: File;
  url: string;
  id: string;
} & Partial<Photo>;

export const compressPhotos = async (
  e: React.ChangeEvent<HTMLInputElement>
): Promise<FileExtended[] | []> => {
  if (!e?.target?.files?.length) {
    console.error("Photos compressing failed.");
    return [];
  }
  let files = [...e.target.files];
  try {
    files = await Promise.all(
      files.map(
        async (item) =>
          await imageCompression(item, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 900,
            useWebWorker: true,
          })
      )
    );
  } catch (e) {
    console.error(e);
    console.trace(e);
  }
  if (!files.length) {
    console.error("No photos been compressed");
    return [];
  }
  return files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
    id: URL.createObjectURL(file),
    isAvatar: false,
  }));
};

// const createPhotosBlobs = async (e) => {
//   try {
//     setL(true);
//     const ph = await compressPhotos(e);
//     setPhotos((prev) => [...prev, ...ph]);
//     setL(false);
//   } catch (e) {
//     setL(false);
//     console.error(e);
//     console.trace(e);
//     alert(e);
//   }
// };
