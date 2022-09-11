export const ORIGIN: string =
  process.env.REACT_APP_ENVIRONMENT === "develop"
    ? "http://localhost:8888"
    : "";

type RouteProp = Record<string, string>;

export type Routes = Record<string, string | RouteProp>;

export const routes = {
  root: "/",
  tomb: {
    root: "/tomb",
  },
  registration: {
    root: "/sign-up",
  },
  login: {
    root: "/login",
  },
  profile: {
    root: "/profile",
  },
  myProfile: {
    root: "/my-profile",
  },
  passwordChange: {
    root: "/passwordChange",
  },
  about: {
    root: "/about",
  },
  grave: {
    root: "/grave",
  },
  graves: {
    root: "/graves",
  },
};
