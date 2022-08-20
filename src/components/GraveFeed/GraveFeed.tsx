import { Box, Flex } from "@chakra-ui/layout";
import { Button, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { Grave } from "../../types/Grave";
import {
  useGetGravesPaginated,
} from "../../utils/hooks/graves/useGetGraves/useGetGraves";

export const GraveFeed = (): JSX.Element => {
  const [page, setPage] = useState<any>(1);
  const [limit, setLimit] = useState<any>(10);

  const {
    data: graves,
    isLoading,
    isError,
  } = useGetGravesPaginated(page, limit);

  const loadMore = () => {
    setPage((prev: number) => prev + 1);
  };

  if (isLoading) return <Spinner />;

  if (isError) return <div>implement error page!</div>;

  return (
    <Box>
      <Button onClick={loadMore}>Load More Graves</Button>
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
