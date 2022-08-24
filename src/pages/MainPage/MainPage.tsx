import { Input } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { GraveFeed } from "../../components/graves/GraveFeed/GraveFeed";
import { ListLayout } from "../../components/layouts/ListLayout/ListLayout";
import graveStore from "../../store/mobx/graves/graves";

export const MainPage = observer((): JSX.Element => {
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
        />
      </ListLayout>
      <GraveFeed graves={input ? searchList : gravesList} />
    </>
  );
});
