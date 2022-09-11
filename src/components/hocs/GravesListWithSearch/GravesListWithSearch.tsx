import { Flex, IconButton, Input, useDisclosure } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { Loader } from "../../../store/mobx/graves/classes/Loader/Loader";
import { Searcher } from "../../../store/mobx/graves/classes/Searcher/Searcher";
import graveStore from "../../../store/mobx/graves/graves";
import { AddGraveForm } from "../../forms/AddGraveForm/AddGraveForm";
import { DrawerLayout } from "../../layouts/DrawerLayout/DrawerLayout";
import { ListLayout } from "../../layouts/ListLayout/ListLayout";

export type GravesApis = Loader | Searcher;

export type GravesListWithSearchProps = {
  children: (api: Loader | Searcher) => JSX.Element;
};

export const GravesListWithSearch = observer(
  (props: GravesListWithSearchProps): JSX.Element => {
    const { children } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { loader, searcher, queries } = graveStore;

    const [gravesApi, setGravesApi] = useState<GravesApis>(loader);

    const handleSearchBarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      queries.setName(e.target.value);
    };

    const reloadGraves = async () => {
      gravesApi.flushData();
      gravesApi.load();
      onClose();
    };

    useEffect(() => {
      if (!!queries.name) {
        setGravesApi(searcher);
        searcher.flushData();
        searcher.load();
      } else {
        setGravesApi(loader);
        searcher.flushData();
        loader.load();
      }
    }, [loader, searcher, queries.name]);

    return (
      <>
        <DrawerLayout
          title={"Создать могилу"}
          isOpen={isOpen}
          onClose={onClose}
          cancelButton={{
            onClick: onClose,
            additionalAttrs: {
              variant: "outline",
              mr: 3,
            },
          }}
          confirmButton={{
            onClick: () => {},
            additionalAttrs: {
              type: "submit",
              form: "add-graves-form",
            },
          }}
        >
          <AddGraveForm handleAfterSubmit={reloadGraves} />
        </DrawerLayout>
        <ListLayout pb={0} bg="white">
          <Flex>
            <Input
              type="text"
              placeholder="ПОИСК"
              value={queries.name || ""}
              onChange={(e) => handleSearchBarInput(e)}
              variant="searchbar"
              mr={3}
            />
            <IconButton
              aria-label="Добавить новую могилу"
              icon={<HiOutlinePlus />}
              onClick={onOpen}
            />
          </Flex>
        </ListLayout>
        {children(gravesApi)}
      </>
    );
  }
);

// const { postNewGrave } = usePostGrave();
// const [counter, setCounter] = useState(1);
/*() => {
                postNewGrave({
                  born: new Date(1999, 3, 8).toISOString(),
                  died: new Date(2003, 3, 8).toISOString(),
                  lastWords: "test",
                  name: `crest${counter}`,
                  photos: [],
                });
                setCounter((prev) => prev + 1);
              }*/
