export type GiftTypes = "vodka" | "candy" | "money";

export type Gift = {
  by: string;
  wish: string;
  type: GiftTypes;
  _id?: string;
};
