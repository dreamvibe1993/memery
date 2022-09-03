import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  SpaceProps,
  Spinner,
  Text,
  TransformProps,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useGetGrave } from "../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { BiExit } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import React, { ReactNode } from "react";

export const Grave = () => {
  const { grave, isLoading, isError } = useGetGrave();
  const history = useHistory();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return <div>Implement error page</div>;
  }

  return (
    <Grid
      gridTemplateRows={"40% 40% 20%"}
      gridTemplateColumns={"20% 60% 20%"}
      gridTemplateAreas={`
        "cell1 cell2 cell3"
        "cell4 cell5 cell6"
        "cell7 cell8 cell9"
        `}
      h="calc(100vh - 61px)"
      w="100%"
    >
      <GridItem
        area={"cell1"}
        as={Flex}
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <SvgWrapper transform="rotate(180deg)">
          <BiExit onClick={() => history.goBack()} />
        </SvgWrapper>
        <SvgWrapper>
          <AiOutlineGift />
        </SvgWrapper>
      </GridItem>
      <GridItem area={"cell2"}>
        <Heading>{grave?.name}</Heading>
        <Img src={grave?.photos[0]} />
      </GridItem>
      <GridItem area={"cell3"}></GridItem>

      <GridItem area={"cell4"}></GridItem>
      <GridItem area={"cell5"}>
        <Text variant="caption">Последние слова: </Text>
        <Text>{grave?.lastWords}</Text>
      </GridItem>
      <GridItem area={"cell6"}></GridItem>

      <GridItem area={"cell7"}></GridItem>
      <GridItem area={"cell8"}></GridItem>
      <GridItem area={"cell9"}></GridItem>
    </Grid>
  );
};

const SvgWrapper = (props: { children: ReactNode } & TransformProps) => {
  const { children } = props;
  return (
    <Box
      w="30px"
      h="30px"
      css={{
        svg: {
          height: "100%",
          width: "100%",
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
