import { Box, Flex } from "@chakra-ui/layout";
import { Center, Fade, Spinner } from "@chakra-ui/react";
import React, {
  forwardRef,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Grave } from "../../../types/Grave";
import { useGetGravesPaginated } from "../../../utils/hooks/graves/useGetGraves/useGetGraves";
import { GraveFeedItem } from "../GraveFeedItem/GraveFeedItem";

export type ListLayoutProps = {
  children: JSX.Element[] | JSX.Element;
  onScroll?: UIEventHandler<HTMLDivElement>;
};

export const ListLayout = forwardRef(
  (props: ListLayoutProps, ref: React.LegacyRef<HTMLDivElement>) => {
    const { children, onScroll } = props;

    return (
      <Box p={5} h="100vh">
        <Box
          h="100%"
          bg="blackAlpha.50"
          overflowY="auto"
          ref={ref}
          onScroll={onScroll}
          pos="relative"
        >
          {children}
        </Box>
      </Box>
    );
  }
);

export const GraveFeed = (): JSX.Element => {
  const ListContainerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    if (!ListContainerRef.current) return;
    const { current: ListContainer } = ListContainerRef;
    const listContainerHeight = ListContainer.offsetHeight;
    const oneCard = 70;
    const paddings = 80;
    const numberOfCards = Math.ceil((listContainerHeight - paddings) / oneCard);
    setLimit(numberOfCards);
  }, []);

  const {
    data: graves,
    isLoading,
    isError,
  } = useGetGravesPaginated(page, limit);

  const loadMore = (): void => {
    setPage((prev: number) => prev + 1);
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

  if (isLoading && limit === 0) {
    return (
      <ListLayout ref={ListContainerRef}>
        <Center p={10}>
          <Spinner />;
        </Center>
      </ListLayout>
    );
  }

  if (isError) return <div>implement error page!</div>;

  return (
    <ListLayout ref={ListContainerRef} onScroll={handleListScroll}>
      <Fade in={isLoading}>
        <Center pos="absolute" h="100%" w="100%" opacity="0.5">
          <Spinner />
        </Center>
      </Fade>
      <List direction="column">
        {graves?.map((grave: Grave) => {
          return <GraveFeedItem key={grave._id} grave={grave} />;
        })}
      </List>
    </ListLayout>
  );
};

const List = styled(Flex)`
  & > * {
    &:not(:last-child) {
      margin-bottom: 1vh;
    }
  }
`;
