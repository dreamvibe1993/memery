import {
  useDisclosure,
  Center,
  Grid,
  GridItem,
  Heading,
  Flex,
  Img,
  Text,
  Box,
  TransformProps,
  Textarea,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiExit, BiMessageRoundedEdit } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useGetGraveReturnType } from "../../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { useUpdateGrave } from "../../../../utils/hooks/graves/useUpdateGrave/useUpdateGrave";
import { mapDateTo } from "../../../../utils/mappers/date/mapDate";
import { CommonModal } from "../../../common/Modal/CommonModal/CommonModal";

export const GraveProfile = (props: useGetGraveReturnType) => {
  const { grave, refreshGrave } = props;
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

  if (!grave) return null;

  return (
    <>
      <CommonModal
        isOpen={isMessageModalOpen}
        onConfirm={setNewGraveMessage}
        onCancel={onMessageModalClose}
        title="Оставить сообщение для покойника:"
      >
        <Textarea
          resize="none"
          onChange={handleGraveMessage}
          value={message}
          placeholder="Ваше сообщение. Максимальная длина 100 символов."
          maxLength={100}
        />
      </CommonModal>
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
          <Text variant="caption">Посетители могилы сказали: </Text>
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
