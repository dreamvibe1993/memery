import { Flex, IconButton, Input, useDisclosure } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import graveStore from "../../../store/mobx/graves/graves";
import { AddGraveForm } from "../../forms/AddGraveForm/AddGraveForm";
import { GraveFeedProps } from "../../graves/GraveFeed/GraveFeed";
import { DrawerLayout } from "../../layouts/DrawerLayout/DrawerLayout";
import { ListLayout } from "../../layouts/ListLayout/ListLayout";
import { HiOutlinePlus } from "react-icons/hi";

export type GravesListWithSearchProps = {
  children: (graves: GraveFeedProps) => JSX.Element;
};

export const GravesListWithSearch = observer(
  (props: GravesListWithSearchProps): JSX.Element => {
    const { children } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [input, setInput] = useState<string>("");

    const { gravesList, searchList, api } = graveStore;

    const handleSearchBarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      api.getGraves({ name: e.target.value });
    };

    const reloadGraves = async () => {
      await api.reload();
      onClose();
    };

    const graves = input ? searchList : gravesList;

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
              value={input}
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
        {children({ graves })}
      </>
    );
  }
);
