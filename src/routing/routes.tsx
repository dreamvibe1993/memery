import { Route, Switch } from "react-router-dom";
import { Grave } from "../components/graves/Grave/Grave";
import { routes } from "../configs/urls/app/app-urls";
import { MainPage } from "../pages/MainPage/MainPage";

export const Routes = () => {
  return (
    <Switch>
      <Route path={routes.root} exact>
        <MainPage />
      </Route>
      <Route path={`${routes.grave.root}/:id`} exact>
        <Grave />
      </Route>
    </Switch>
  );
};
