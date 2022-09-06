import { Box, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { TbCandy } from "react-icons/tb";
import { MdLocalDrink } from "react-icons/md";
import { useGetGraveReturnType } from "../../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { Gift } from "../../../../types/Gift";

export const GraveGifts = (props: useGetGraveReturnType) => {
  const { grave, refreshGrave } = props;

  if (!grave) return null;

  return (
    <VStack>
      <Box height="440px" width="100%" overflowY="auto" bg="gray.200">
        <Grid
          gap="10px"
          gridTemplateColumns="repeat(3, calc(33% - 10px))"
          gridAutoRows="100px"
          width="100%"
          height="100%"
          justifyContent="space-between"
          p={3}
        >
          {Object.keys(grave.gifts)
            .reduce((acc: Gift[], curr) => {
              acc = [...acc, ...grave.gifts[curr as keyof typeof grave.gifts]];
              return acc;
            }, [])
            .map((gift) => (
              <GridItem bg="white" key={gift._id} shadow="base"></GridItem>
            ))}
        </Grid>
      </Box>
      <Flex
        justify={"space-around"}
        width="100%"
        mt="1rem !important"
        css={{
          svg: {
            height: "40px",
            width: "40px",
          },
        }}
      >
        <FaMoneyBillWave />
        <TbCandy />
        <MdLocalDrink />
      </Flex>
    </VStack>
  );
};
