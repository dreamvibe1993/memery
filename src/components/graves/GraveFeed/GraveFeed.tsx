import { Flex } from "@chakra-ui/layout";
import { Box, Center, Fade, Spinner, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { UIEventHandler, useContext, useEffect, useRef } from "react";
import { useErrorHandler } from "react-error-boundary";
import styled from "styled-components";
import { DrawerContext } from "../../../contexts/drawer-context/drawer-context";
import graveStore from "../../../store/mobx/graves/graves";
import { Grave } from "../../../types/Grave";
import { DrawerLeft } from "../../common/Drawer/Drawer";
import { AddGraveForm } from "../../forms/AddGraveForm/AddGraveForm";
import { ListLayout } from "../../layouts/ListLayout/ListLayout";
import { GraveFeedItem } from "../GraveFeedItem/GraveFeedItem";

export type GraveFeedProps = { graves: Grave[] };

export const GraveFeed: React.FC<GraveFeedProps> = observer(
  (props): JSX.Element => {
    const { onClose } = useContext(DrawerContext);
    const ListContainerRef = useRef<HTMLDivElement | null>(null);
    const handleError = useErrorHandler();

    const { api } = graveStore;

    useEffect(() => {
      if (api.isError) {
        handleError(api.error);
      }
    }, [api.isError]);

    useEffect(() => {
      if (!ListContainerRef.current) return;
      const { current: ListContainer } = ListContainerRef;
      const listContainerHeight = ListContainer.offsetHeight;
      const oneCard = 70;
      const paddings = 80;
      const numberOfCards = Math.ceil(
        (listContainerHeight - paddings) / oneCard
      );
      api.setLimit(numberOfCards);
    }, [api]);

    const { graves } = props;

    const loadMore = (): void => {
      api.setNextPage();
    };

    const evaluateBottom = (): number => {
      if (!ListContainerRef.current) return 100;
      const contScrollHeight = ListContainerRef.current.scrollHeight;
      const contScrollTop = ListContainerRef.current.scrollTop;
      const contClientHeight = ListContainerRef.current.clientHeight;

      return Math.floor(contScrollHeight - contScrollTop - contClientHeight);
    };

    const handleListScroll: UIEventHandler<HTMLDivElement> = (
      event: React.UIEvent<HTMLElement>
    ) => {
      if (evaluateBottom() < 1) {
        loadMore();
      }
    };

    const reloadGraves = async () => {
      await api.reload();
      onClose();
    };

    if (api.isEmpty === undefined) {
      return (
        <ListLayout ref={ListContainerRef}>
          <Center p={10}>
            <Spinner />
          </Center>
        </ListLayout>
      );
    }

    if (api.isError) return <div>еггог!</div>;

    return (
      <>
        <DrawerLeft
          title={"Создать могилу"}
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
        </DrawerLeft>
        <ListLayout ref={ListContainerRef} onScroll={handleListScroll}>
          <Fade in={api.isLoading}>
            <Center
              pos="absolute"
              pointerEvents="none"
              h="100%"
              w="100%"
              opacity="0.5"
            >
              <Spinner />
            </Center>
          </Fade>
          <List direction="column">
            {graves.length > 0 ? (
              graves.map((grave: Grave) => {
                return <GraveFeedItem key={grave._id} grave={grave} />;
              })
            ) : api.isEmpty === true ? (
              <TextWrapper>
                Пока никто никого не похоронил... Но ты можешь быть первым!
              </TextWrapper>
            ) : api.isEmpty === false ? (
              <TextWrapper>По вашему запросу никого не найдено.</TextWrapper>
            ) : (
              ""
            )}
          </List>
        </ListLayout>
      </>
    );
  }
);

const TextWrapper = (props: { children: string }) => {
  return (
    <Box p={3}>
      <Text variant="caption" align="center">
        {props.children}
      </Text>
    </Box>
  );
};

const List = styled(Flex)`
  & > * {
    &:not(:last-child) {
      margin-bottom: 1vh;
    }
  }
`;
