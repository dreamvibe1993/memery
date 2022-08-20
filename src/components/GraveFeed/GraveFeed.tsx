import { Box, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { Grave } from "../../types/Grave";
import { useGetGraves } from "../../utils/hooks/useGetGraves/useGetGraves";

export const GraveFeed = (): JSX.Element => {
  const { data: graves, isLoading, isError } = useGetGraves();

  if (isLoading) return <Spinner />;

  if (isError) return <div>implement error page!</div>;

  return (
    <Box>
      {graves?.map((grave: Grave) => {
        return (
          <Flex shadow="md" p={2} key={grave._id}>
            {grave.name}
          </Flex>
        );
      })}
    </Box>
  );
};
