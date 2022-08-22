import { Grid, GridItem, Img, Center, Text, Box, Fade } from "@chakra-ui/react";
import { IoEnterOutline } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { Grave } from "../../../types/Grave";

export type GraveFeedItemProps = {
  grave: Grave;
};

export const GraveFeedItem = (props: GraveFeedItemProps): JSX.Element => {
  const { grave } = props;

  const { ref, inView } = useInView({ delay: 150, triggerOnce: true });

  return (
    <Box h="70px" ref={ref}>
      <Fade in={inView}>
        <Grid
          key={grave._id}
          border="1px"
          borderStyle="solid"
          borderColor="chakra-border-color"
          shadow="sm"
          p={2}
          bg="InfoBackground"
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
      </Fade>
    </Box>
  );
};
