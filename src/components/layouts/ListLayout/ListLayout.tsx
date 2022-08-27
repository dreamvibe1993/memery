import React, { UIEventHandler, forwardRef } from "react";
import { Box, SpaceProps } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

export type ListLayoutProps = {
  children: JSX.Element[] | JSX.Element | null;
  onScroll?: UIEventHandler<HTMLDivElement>;
};

export const ListLayout = observer(
  forwardRef(
    (
      props: ListLayoutProps & SpaceProps,
      ref: React.LegacyRef<HTMLDivElement>
    ) => {
      const { children, onScroll } = props;

      return (
        <Box p={5} h={ref ? "100vh" : "auto"} {...props}>
          <Box
            h={ref ? "100%" : "auto"}
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
  )
);
