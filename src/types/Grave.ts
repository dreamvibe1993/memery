import { Gift } from "./Gift";
import { User } from "./User";

export interface Grave {
  _id: string;
  name: string;
  born: string;
  died: string;
  photos: Array<string>;
  gifts: Array<Gift>;
  chatLogs: Array<string>;
  songs: Array<null>;
  lastWords: string;
  madeBy: User;
}
