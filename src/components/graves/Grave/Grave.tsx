import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  TransformProps,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useGetGrave } from "../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { BiExit, BiMessageRoundedEdit } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import React, { ReactNode, useState } from "react";
import { FaDonate } from "react-icons/fa";
import { mapDateTo } from "../../../utils/mappers/date/mapDate";
import { useUpdateGrave } from "../../../utils/hooks/graves/useUpdateGrave/useUpdateGrave";

export const Grave = () => {
  const { grave, isLoading, isError, refreshGrave } = useGetGrave();
  const { updateGraveMessages } = useUpdateGrave();
  const {
    isOpen: isMessageModalOpen,
    onOpen: onMessageModalOpen,
    onClose: onMessageModalClose,
  } = useDisclosure();
  const history = useHistory();

  const [message, setMessage] = useState<string>();

  const handleGraveMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const setNewGraveMessage = async () => {
    if (!grave || !message) {
      return console.error("Setting new grave message failed!");
    }
    await updateGraveMessages(grave, message);
    refreshGrave();
    onMessageModalClose();
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return <div>Implement error page</div>;
  }

  if (!grave) {
    return <div>Implement error page</div>;
  }

  return (
    <>
      <Modal isOpen={isMessageModalOpen} onClose={onMessageModalClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"3px"} w="90%" maxW="500px">
          <ModalHeader>Оставить сообщение для покойника</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              resize="none"
              onChange={handleGraveMessage}
              value={message}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onMessageModalClose}>Отменить</Button>
            <Button onClick={setNewGraveMessage}>Отправить</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid
        gridTemplateRows={"auto 290px 10% 40%"}
        gridTemplateColumns={"20% 60% 20%"}
        gridTemplateAreas={`
        "head head close"
        "cell1 cell2 cell3"
        "cell4 cell5 cell6"
        "chat chat chat"
        `}
        h="calc(100vh - 61px)"
        w="100%"
        p={5}
      >
        <GridItem area="head">
          <Heading>{grave.name}</Heading>
        </GridItem>
        <GridItem
          area="close"
          as={Flex}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <SvgWrapper transform="rotate(180deg)">
            <BiExit onClick={() => history.push("/")} />
          </SvgWrapper>
        </GridItem>
        <GridItem
          area={"cell1"}
          as={Flex}
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
          pt="40px"
        >
          <SvgWrapper>
            <AiOutlineGift />
          </SvgWrapper>
          <SvgWrapper>
            <FaDonate />
          </SvgWrapper>
          <SvgWrapper>
            <BiMessageRoundedEdit onClick={onMessageModalOpen} />
          </SvgWrapper>
        </GridItem>
        <GridItem area={"cell2"}>
          <Grid
            gridTemplateAreas={`
              "header"
              "photo"
        `}
            gridTemplateRows="40px 250px"
            gridTemplateColumns="100%"
          >
            <GridItem area="header" textAlign="center">
              <Text variant="caption">
                Родился: {mapDateTo("DDMMYYYY", grave.born)}
              </Text>
              <Text variant="caption">
                Смерть: {mapDateTo("DDMMYYYY", grave.died)}
              </Text>
            </GridItem>
            <GridItem
              area="photo"
              as={Center}
              border="1px solid grey"
              borderColor="gray.300"
            >
              <Img src={grave?.photos[0]} />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem area={"cell3"}></GridItem>

        <GridItem area={"cell4"}></GridItem>
        <GridItem area={"cell5"} pt={5}>
          <Text variant="caption">Последние слова: </Text>
          <Text>{grave?.lastWords}</Text>
        </GridItem>
        <GridItem area={"cell6"}></GridItem>

        <GridItem area={"chat"} p={5}>
          <Flex
            direction={"column"}
            border="1px solid"
            borderColor="gray.300"
            h="100%"
            p={3}
          >
            {grave.chatLogs.length < 1 ? (
              <Text variant={"caption"}>
                Здесь пока ничего не написали... Но ты можешь быть первым!
              </Text>
            ) : (
              grave.chatLogs.map((chatlog: string, i: number) => {
                return <Text key={chatlog + i}>&gt; {chatlog}</Text>;
              })
            )}
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

const SvgWrapper = (props: { children: ReactNode } & TransformProps) => {
  const { children } = props;
  return (
    <Box
      w="30px"
      h="30px"
      css={{
        svg: {
          height: "100%",
          width: "100%",
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
