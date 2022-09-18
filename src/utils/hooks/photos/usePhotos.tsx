import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Photo } from "../../../types/Photo";
import { updatePhotos } from "../../api/photos/photos";
import {
  compressPhotos,
  FileExtended,
} from "../../comperssors/photos/compressPhotos";
import { returnErrorToast } from "../../mappers/toasts/returnErrorToast";

export const usePhotos = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedPhotosUrls, setUploadedPhotosUrls] = useState<Photo[]>([]);
  const [newPhotosFiles, setNewPhotosFiles] = useState<FileExtended[]>([]);
  const [photosUrls, setPhotosUrls] = useState<Photo[]>([]);
  const [chosenPhotosUrls, setChosenPhotosUrls] = useState<Photo[]>([]);
  const toast = useToast();

  const choosePhotoByUrl = (photo: Photo) => {
    setChosenPhotosUrls((prev: Photo[]) => {
      if (prev.includes(photo)) {
        return prev.filter((oldPhoto) => oldPhoto.url !== photo.url);
      }
      return [...prev, photo];
    });
  };

  const deletePhoto = (photo: Photo): void => {
    setUploadedPhotosUrls((prev) =>
      prev.filter((photoOld) => photoOld.url !== photo.url)
    );
    setNewPhotosFiles((prev) => prev.filter((file) => file.url !== photo.url));
    setPhotosUrls((prev) =>
      prev.filter((photoOld) => photoOld.url !== photo.url)
    );
  };

  const deletePhotos = (photos: Photo[]): void => {
    photos.forEach((photo) => deletePhoto(photo));
  };

  const addPhotosFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const ph = await compressPhotos(e);
      setNewPhotosFiles((prev) => [...prev, ...ph]);
      setPhotosUrls((prev) => [
        ...prev,
        ...ph.map((ph) => ({ url: ph.url, isAvatar: false })),
      ]);
    } catch (e) {
      console.error(e);
      console.trace(e);
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const deletePhotoFile = (id: string) => {
    let photoFile: FileExtended;
    setNewPhotosFiles((prev: FileExtended[]) =>
      prev.filter((ph) => {
        if (ph.id === id) photoFile = ph;
        return ph.id !== id;
      })
    );
    setPhotosUrls((prev) =>
      prev.filter((photo) => photoFile?.url !== photo.url)
    );
  };

  const uploadPhotos = async (photos: FileExtended[], url: string) => {
    setLoading(true);
    try {
      const response = await updatePhotos(photos, url);
      if (!response?.data?.photos) {
        toast(returnErrorToast("Фотографии не загрузились!("));
        return;
      }
      const uploadedPhotos = response.data.photos;
      return uploadedPhotos;
    } catch (e) {
      toast(returnErrorToast("При загрузке фотографий произошла ошибка!"));
    } finally {
      setLoading(false);
    }
  };

  const makeAsAvatar = (url: string) => {
    const unflagAvatar = (prev: any) =>
      prev.map((f: Partial<Photo> & FileExtended) => {
        f.isAvatar = false;
        return f;
      });

    const flagAvatar = (prev: any) =>
      prev.map((photo: Photo | FileExtended) => {
        if (photo.url === url) {
          photo.isAvatar = true;
        }
        return photo;
      });

    setNewPhotosFiles(unflagAvatar);
    setUploadedPhotosUrls(unflagAvatar);
    setPhotosUrls(unflagAvatar);

    setNewPhotosFiles(flagAvatar);
    setUploadedPhotosUrls(flagAvatar);
    setPhotosUrls(flagAvatar);
  };

  return {
    newPhotosFiles,
    uploadedPhotosUrls,
    addPhotosFiles,
    deletePhotoFile,
    setUploadedPhotosUrls,
    isLoading: loading,
    uploadPhotos,
    photosUrls,
    setPhotosUrls,
    deletePhotos,
    chosenPhotosUrls,
    choosePhotoByUrl,
    makeAsAvatar,
  };
};
