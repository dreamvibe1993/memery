import { observer } from "mobx-react-lite";
import {
  GraveFeed,
  GraveFeedProps,
} from "../../components/graves/GraveFeed/GraveFeed";
import { GravesListWithSearch } from "../../components/hocs/GravesListWithSearch/GravesListWithSearch";

export const MainPage = observer((): JSX.Element => {
  return (
    <GravesListWithSearch>
      {(listOf: GraveFeedProps) => {
        return <GraveFeed graves={listOf.graves} />;
      }}
    </GravesListWithSearch>
  );
});
