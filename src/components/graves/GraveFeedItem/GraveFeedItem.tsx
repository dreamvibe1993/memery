import {
  Grid,
  GridItem,
  Img,
  Center,
  Text,
  Box,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { IoEnterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Grave } from "../../../types/Grave";
import { mapDateTo } from "../../../utils/mappers/date/mapDate";

export type GraveFeedItemProps = {
  grave: Grave;
};

export const GraveFeedItem = observer(
  (props: GraveFeedItemProps): JSX.Element => {
    const { grave } = props;
    const { isOpen, onToggle } = useDisclosure();

    return (
      <Box>
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
          h={isOpen ? "96px" : "70px"}
          transition={!isOpen ? `all .1s .2s linear` : "all .1s ease"}
        >
          <GridItem area="photo" mr={2}>
            <Img
              src={
                grave.photos.length > 0
                  ? grave.photos[0]
                  : "https://via.placeholder.com/150/000000/FFFFFF/?text=Ебало"
              }
              objectFit="cover"
              h="100%"
              w="100%"
              borderRadius="sm"
              transition={"all"}
            />
          </GridItem>
          <GridItem area="name">
            <Text noOfLines={1}>{grave.name}</Text>
          </GridItem>
          <GridItem area="open" alignSelf="self-end">
            <Text variant="caption" onClick={onToggle}>
              {isOpen ? "Свернуть" : "Развернуть"}
            </Text>
            <Collapse in={isOpen} animateOpacity>
              <Text variant="caption">
                Родился: {mapDateTo("DDMMYYYY", grave.born)}
              </Text>
              <Text variant="caption">
                Смерть: {mapDateTo("DDMMYYYY", grave.died)}
              </Text>
            </Collapse>
          </GridItem>
          <GridItem area="enter" color="gray.500" as={Center}>
            <Box
              css={{
                "*": {
                  height: "60%",
                  width: "60%",
                },
              }}
              as={Link}
              to={`/grave/${grave._id}`}
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="100%"
              w="100%"
            >
              <IoEnterOutline />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    );
  }
);
