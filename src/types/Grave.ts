import { Gift } from "./Gift";
import { User } from "./User";

type Gifts<T> = { [Property in keyof T]: Array<Gift> };

export type Grave = {
  _id: string;
  name: string;
  born: string;
  died: string;
  photos: Array<string>;
  gifts: Gifts<"candies" | "btc" | "vodka">;
  chatlogs: Array<string>;
  songs: Array<null>;
  lastWords: string;
  graveCellNum: number;
  madeBy: User;
};
