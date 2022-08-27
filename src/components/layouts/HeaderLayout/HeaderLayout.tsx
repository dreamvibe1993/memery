import { Grid } from "@chakra-ui/react";
import React from "react";

export const HeaderLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <Grid
      gridTemplateAreas={`
          "body switch burger"
          `}
      gridTemplateColumns="60% 20% 20%"
      gridTemplateRows="100%"
      h={61}
      pos="sticky"
      shadow="base"
    >
      {children}
    </Grid>
  );
};
