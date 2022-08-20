import { Route, Switch } from "react-router-dom";
import { MainPage } from "../pages/MainPage/MainPage";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage />
      </Route>
    </Switch>
  );
};
