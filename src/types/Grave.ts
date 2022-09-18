import { Gift } from "./Gift";
import { Photo } from "./Photo";
import { User } from "./User";

export interface Grave {
  _id: string;
  name: string;
  born: string;
  died: string;
  photos: Array<Photo>;
  gifts: Array<Gift>;
  chatLogs: Array<string>;
  songs: Array<null>;
  lastWords: string;
  madeBy: User;
}
