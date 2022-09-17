import {
  IUserProfile,
  UserContact,
  UserRoles,
} from "../../../../../types/User";

export class UserProfile implements IUserProfile {
  photos: string[];
  _id: string;
  contacts: UserContact[];
  gender: number[];
  colorTheme: string;
  name?: string | undefined;
  email: string;
  role: UserRoles;

  constructor(user: IUserProfile) {
    this.photos = user.photos;
    this._id = user._id;
    this.contacts = user.contacts;
    this.gender = user.gender;
    this.colorTheme = user.colorTheme;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}
