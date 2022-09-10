import {
  Heading,
  VStack,
  Text,
  Button,
  Center,
  Img,
  Box,
  Code,
} from "@chakra-ui/react";
import MafiaInKrazGIF from "../../../../assets/img/gif/mafia-in-kraz.gif";
import { HEADER_HEIGHT } from "../../Header/Header";

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

export const ErrorPage = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;
  return (
    <VStack p={3} h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <Heading as="h1">БЛЯТЬ</Heading>
      <Center h="300px" w="100%" my={3}>
        <Img src={MafiaInKrazGIF} w="100%" h="100%" objectFit="cover" />
      </Center>
      <Center flex="1">
        <Heading as="h3">Да ёб твою мать!</Heading>
      </Center>
      <Center flex="1">
        <Code children={error.message} p={3} bg="white" />
      </Center>
      <Center flex="1">
        <Button onClick={resetErrorBoundary}>Ещё раз</Button>
      </Center>
    </VStack>
  );
};
