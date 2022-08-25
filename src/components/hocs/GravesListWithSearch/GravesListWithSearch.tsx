import { Input } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import graveStore from "../../../store/mobx/graves/graves";
import { GraveFeedProps } from "../../graves/GraveFeed/GraveFeed";
import { ListLayout } from "../../layouts/ListLayout/ListLayout";

export type GravesListWithSearchProps = {
  children: (graves: GraveFeedProps) => JSX.Element;
};

export const GravesListWithSearch = observer(
  (props: GravesListWithSearchProps): JSX.Element => {
    const { children } = props;

    const [input, setInput] = useState<string>("");

    const { gravesList, searchList, api } = graveStore;

    const handleSearchBarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      api.getGraves({ name: e.target.value });
    };

    return (
      <>
        <ListLayout pb={0}>
          <Input
            type="text"
            placeholder="ПОИСК"
            value={input}
            onChange={(e) => handleSearchBarInput(e)}
            variant="searchbar"
          />
        </ListLayout>
        {children({ graves: input ? searchList : gravesList })}
      </>
    );
  }
);
