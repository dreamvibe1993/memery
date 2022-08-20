import axios from "axios";
import { BareFetcher } from "swr/dist/types";

export type ClientAction<T> = BareFetcher<T>;

export const client = (url: string) =>
  axios.get(url).then((res) => res.data);
