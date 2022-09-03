import { Gift } from "./Gift";
import { User } from "./User";

export type Gifts = {
  vodka: Array<Gift>,
  btc: Array<Gift>,
  candies: Array<Gift>
}

export interface Grave {
  _id: string;
  name: string;
  born: string;
  died: string;
  photos: Array<string>;
  gifts: Gifts;
  chatLogs: Array<string>;
  songs: Array<null>;
  lastWords: string;
  graveCellNum: number;
  madeBy: User;
}
