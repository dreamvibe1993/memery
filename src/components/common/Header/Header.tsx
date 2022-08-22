import { Center, Grid, GridItem, Switch, useColorMode } from "@chakra-ui/react";

export const Header = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Grid
      gridTemplateAreas={`
        "nothing switch"
        `}
      gridTemplateColumns="80% 20%"
      gridTemplateRows="100%"
      h={61}
      pos="sticky"
      shadow="base"
    >
      <GridItem area="nothing"></GridItem>
      <GridItem as={Center} area="switch">
        <Switch size="md" onChange={toggleColorMode} />
      </GridItem>
    </Grid>
  );
};
