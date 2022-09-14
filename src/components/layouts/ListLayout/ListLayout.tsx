import React, { UIEventHandler, forwardRef } from "react";
import { BackgroundProps, Box, SpaceProps } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { HEADER_HEIGHT } from "../../common/Header/Header";

export type ListLayoutProps = {
  children: JSX.Element[] | JSX.Element | null;
  onScroll?: UIEventHandler<HTMLDivElement>;
};

export const ListLayout = observer(
  forwardRef(
    (
      props: ListLayoutProps & SpaceProps & BackgroundProps,
      ref: React.LegacyRef<HTMLDivElement>
    ) => {
      const { children, onScroll } = props;

      return (
        <Box
          p={5}
          h={ref ? `calc(100vh - ${HEADER_HEIGHT}px  - 60px)` : "auto"}
          {...props}
        >
          <Box
            h={ref ? "100%" : "auto"}
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
