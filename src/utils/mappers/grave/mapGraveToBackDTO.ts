import { Grave } from "../../../types/Grave";
import { PostGraveFormData } from "../../hooks/graves/usePostGrave/usePostGrave";

export const mapGraveToBackDTO = ( grave: PostGraveFormData ) => {
  const partialGrave: Partial<Grave> = {
    born: new Date(grave.born).toISOString(),
    died: new Date(grave.died).toISOString(),
    gifts: {
      candies: [],
      btc: [],
      vodka: [],
    },
    chatLogs: [],
    graveCellNum: Math.round(Math.random() * 100),
    lastWords: grave.lastWords,
    photos: grave.photos,
    name: grave.name,
    songs: [],
  };
  for (let key in partialGrave) {
    if (partialGrave[key as keyof Grave] === undefined) {
      throw new Error(
        `Back model is not consistent! No ${key} value provided! JSON: ` +
          JSON.stringify(partialGrave, null, 1)
      );
    }
  }
  return partialGrave;
};