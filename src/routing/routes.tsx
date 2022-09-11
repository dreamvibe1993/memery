import { Route, Switch } from "react-router-dom";
import { NotFoundPage } from "../pages/404/404";
import { Grave } from "../components/graves/Grave/Grave";
import {
  GraveFeedProps,
  GraveFeed,
} from "../components/graves/GraveFeed/GraveFeed";
import { GravesListWithSearch } from "../components/hocs/GravesListWithSearch/GravesListWithSearch";
import { routes } from "../configs/urls/app/app-urls";
import { Login } from "../pages/Login/Login";
import { MainPage } from "../pages/MainPage/MainPage";
import { Registration } from "../pages/Registration/Registration";

export const Routes = () => {
  return (
    <Switch>
      <Route path={routes.root} exact>
        <MainPage />
      </Route>
      <Route path={`${routes.grave.root}/:id`} exact>
        <Grave />
      </Route>
      <Route path={`${routes.graves.root}`} exact>
        <GravesListWithSearch>
          {(listOf: GraveFeedProps) => {
            return <GraveFeed graves={listOf.graves} />;
          }}
        </GravesListWithSearch>
      </Route>
      <Route path={routes.login.root} exact>
        <Login />
      </Route>
      <Route path={routes.registration.root} exact>
        <Registration />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
