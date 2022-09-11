export type User = {
  id: string;
  picture: string;
};

export type UserCreds = {
  name?: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
}

export type UserContact = {
  platform: string,
  link: string,
  active: boolean
}

export interface IUserProfile extends UserCreds {
  photos: string[]
  _id: string,
  contacts: UserContact[],
  gender: number[],
  colorTheme: string
}