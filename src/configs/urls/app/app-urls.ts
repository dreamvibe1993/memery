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
  auth: {
    root: "/auth",
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
};
