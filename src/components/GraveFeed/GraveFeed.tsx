import { Box, Flex } from "@chakra-ui/layout";
import {
  Center,
  Fade,
  Grid,
  GridItem,
  Img,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { UIEventHandler, useEffect, useRef, useState } from "react";
import { IoEnterOutline } from "react-icons/io5";
import styled from "styled-components";
import { Grave } from "../../types/Grave";
import { useGetGravesPaginated } from "../../utils/hooks/graves/useGetGraves/useGetGraves";

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
      <Box p={10} h="100vh">
        <Box h="100%" bg="gray.50" overflowY="auto" ref={ListContainerRef}>
          <Center p={10}>
            <Spinner />;
          </Center>
        </Box>
      </Box>
    );
  }

  if (isError) return <div>implement error page!</div>;

  return (
    <Box p={10} h="100vh">
      {/* <Button onClick={loadMore}>Load More Graves</Button> */}
      <Box
        h="100%"
        bg="gray.50"
        overflowY="auto"
        ref={ListContainerRef}
        onScroll={handleListScroll}
        pos="relative"
      >
        <Fade in={isLoading}>
          <Center pos="absolute" h="100%" w="100%" bg="white" opacity="0.5">
            <Spinner />
          </Center>
        </Fade>
        <List direction="column">
          {graves?.map((grave: Grave) => {
            return (
              <Grid
                key={grave._id}
                border="1px"
                borderStyle="solid"
                borderColor="gray.100"
                shadow="sm"
                p={2}
                bg="white"
                gridTemplateAreas={`
                "photo name enter"
                "photo open enter"
                `}
                gridTemplateColumns="20% 60% 20%"
                gridTemplateRows="50% 50%"
                h="70px"
              >
                <GridItem area="photo" mr={2}>
                  <Img
                    src={
                      grave.photos[0] ||
                      "https://via.placeholder.com/150/000000/FFFFFF/?text=Ебало"
                    }
                    objectFit="cover"
                    h="100%"
                    w="100%"
                    borderRadius="sm"
                  />
                </GridItem>
                <GridItem area="name">
                  <Text noOfLines={1}>{grave.name}</Text>
                </GridItem>
                <GridItem area="open" alignSelf="self-end">
                  <Text fontSize={12} color="gray.500">
                    Развернуть
                  </Text>
                </GridItem>
                <GridItem
                  area="enter"
                  as={Center}
                  css={{
                    "*": {
                      height: "60%",
                      width: "60%",
                    },
                  }}
                  color="gray.500"
                >
                  <IoEnterOutline />
                </GridItem>
              </Grid>
            );
          })}
        </List>
      </Box>
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
