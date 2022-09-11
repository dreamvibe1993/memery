import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { routes } from "../../configs/urls/app/app-urls";
import { HEADER_HEIGHT } from "../../components/common/Header/Header";

export const NotFoundPage = () => {
  return (
    <VStack p={3} h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <Center flex={1}>
        <Heading as="h1" fontSize={76}>404</Heading>
      </Center>
      <Center flex={1}>
        <Button as={Link} to={routes.root}>
          На главную
        </Button>
      </Center>
    </VStack>
  );
};
