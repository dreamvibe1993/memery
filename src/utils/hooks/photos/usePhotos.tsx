import { useState } from "react";
import {
  compressPhotos,
  FileExtended,
} from "../../comperssors/photos/compressPhotos";

export type UsePhotosReturnType = {
  photos: FileExtended[];
  addPhoto: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  deletePhoto: (id: string) => void;
  isLoading: boolean;
};

export const usePhotos = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Array<FileExtended>>([]);

  const deletePhoto = (id: string): void => {
    setPhotos((prev) => prev.filter((blob) => blob.id !== id));
  };

  const createPhotosBlobs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const ph = await compressPhotos(e);
      setPhotos((prev) => [...prev, ...ph]);
    } catch (e) {
      console.error(e);
      console.trace(e);
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    photos,
    addPhoto: createPhotosBlobs,
    deletePhoto,
    isLoading: loading,
  };
};
