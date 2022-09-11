import { action, makeAutoObservable, observable } from "mobx";
import { UserProfile } from "./classes/UserProfile/UserProfile";

const UsersStoreProps = {
  isLoggedIn: observable,
  user: observable,
  
  setLoggedIn: action.bound,
  setUser: action.bound,
  flushUser: action.bound
};

class UsersStore {
  isLoggedIn?: boolean;
  user?: UserProfile;

  constructor() {
    makeAutoObservable(this, UsersStoreProps);
  }

  setLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  setUser(user: UserProfile) {
    this.user = new UserProfile(user);
  }

  flushUser() {
    this.user = undefined;
  }
}

export default new UsersStore();
