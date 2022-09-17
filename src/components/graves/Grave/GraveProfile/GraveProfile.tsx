import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Text,
  Textarea,
  TransformProps,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiExit, BiMessageRoundedEdit, BiTrash } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { useGetGraveReturnType } from "../../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { useUpdateGrave } from "../../../../utils/hooks/graves/useUpdateGrave/useUpdateGrave";
import { mapDateTo } from "../../../../utils/mappers/date/mapDate";
import { HEADER_HEIGHT } from "../../../common/Header/Header";
import { CommonModal } from "../../../common/Modal/CommonModal/CommonModal";
import { UserRoles } from "../../../../types/User";
import { useReturnUserStore } from "../../../../utils/hooks/mobx/users/useReturnUserStore";
import { observer } from "mobx-react-lite";
import { useDeleteGrave } from "../../../../utils/hooks/graves/useDeleteGrave/useDeleteGrave";
import { Alert } from "../../../common/Modal/Alert/Alert";

export const GraveProfile = observer((props: useGetGraveReturnType) => {
  const { grave, refreshGrave } = props;
  const { updateGraveMessages } = useUpdateGrave();
  const { deleteGrave } = useDeleteGrave();
  const { user } = useReturnUserStore();

  const {
    isOpen: isMessageModalOpen,
    onOpen: onMessageModalOpen,
    onClose: onMessageModalClose,
  } = useDisclosure();

  const {
    isOpen: isPhotoGalleryOpen,
    onOpen: openPhotoGallery,
    onClose: closePhotoGallery,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
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

  const [isDeleteModalLoading, setDeleteModalLoading] = useState(false);
  const deleteThisGrave = async () => {
    if (!grave) return console.error("No grave to delete");
    try {
      setDeleteModalLoading(true);
      await deleteGrave(grave);
    } finally {
      closeDeleteModal();
      setDeleteModalLoading(false);
    }
  };

  if (!grave) return null;

  return (
    <>
      <Alert
        isLoading={isDeleteModalLoading}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        cancelButton={{ title: "Отмена", onClick: closeDeleteModal }}
        confirmButton={{ title: "Удалить", onClick: deleteThisGrave }}
        title="Удалить"
      >
        <Text>Вы уверены, что хотите удалить могилу {grave.name}?</Text>
      </Alert>
      <CommonModal
        isOpen={isMessageModalOpen}
        confirmButton={{
          onClick: setNewGraveMessage,
        }}
        cancelButton={{
          onClick: onMessageModalClose,
        }}
        onClose={onMessageModalClose}
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
        h={`calc(100vh - ${HEADER_HEIGHT}px)`}
        w="100%"
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
          {(user?._id === grave.madeBy.id ||
            user?.role === UserRoles.admin) && (
            <SvgWrapper>
              <BiTrash onClick={openDeleteModal} />
            </SvgWrapper>
          )}
          <SvgWrapper>
            <AiOutlineGift />
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
              {isPhotoGalleryOpen && (
                <ImageViewer
                  src={grave.photos}
                  onClose={closePhotoGallery}
                  disableScroll={true}
                  closeOnClickOutside={true}
                />
              )}
              <Img
                src={grave.photos[0]}
                onClick={openPhotoGallery}
                cursor="pointer"
              />
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
          {grave.chatLogs.length > 0 ? (
            <>
              <Text variant="caption">Посетители могилы сказали: </Text>
              <Flex
                direction={"column"}
                border="1px solid"
                borderColor="gray.300"
                h="100%"
                p={3}
              >
                {grave.chatLogs.map((chatlog: string, i: number) => {
                  return <Text key={chatlog + i}>&gt; {chatlog}</Text>;
                })}
              </Flex>
            </>
          ) : (
            <Text variant="caption">
              На могиле тишина... Оставьте сообщение, нажав на кнопочку выше.
            </Text>
          )}
        </GridItem>
      </Grid>
    </>
  );
});

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
