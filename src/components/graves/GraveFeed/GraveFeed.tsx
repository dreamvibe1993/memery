import { Flex } from "@chakra-ui/layout";
import { Center, Fade, Spinner } from "@chakra-ui/react";
import React, { UIEventHandler, useEffect, useRef } from "react";
import styled from "styled-components";
import { Grave } from "../../../types/Grave";
import { GraveFeedItem } from "../GraveFeedItem/GraveFeedItem";
import { observer } from "mobx-react-lite";
import graveStore from "../../../store/mobx/graves/graves";
import { ListLayout } from "../../layouts/ListLayout/ListLayout";

export const GraveFeed = observer((props: { graves: Grave[] }): JSX.Element => {
  const ListContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ListContainerRef.current) return;
    const { current: ListContainer } = ListContainerRef;
    const listContainerHeight = ListContainer.offsetHeight;
    const oneCard = 70;
    const paddings = 80;
    const numberOfCards = Math.ceil((listContainerHeight - paddings) / oneCard);
    api.setLimit(numberOfCards);
  }, []);

  const { api } = graveStore;
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

  // if (api.isLoading) { починить
  //   return (
  //     <ListLayout ref={ListContainerRef}>
  //       <Center p={10}>
  //         <Spinner />;
  //       </Center>
  //     </ListLayout>
  //   );
  // }

  if (api.isError) return <div>implement error page!</div>;

  return (
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
        {graves.length > 0
          ? graves.map((grave: Grave) => {
              return <GraveFeedItem key={grave._id} grave={grave} />;
            })
          : "нету такова ничево..."}
      </List>
    </ListLayout>
  );
});

const List = styled(Flex)`
  & > * {
    &:not(:last-child) {
      margin-bottom: 1vh;
    }
  }
`;
