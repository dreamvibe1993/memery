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
  Input,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { ChangeEvent, ReactNode, useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiExit, BiMessageRoundedEdit, BiTrash } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { routes } from "../../../../configs/urls/app/app-urls";
import { UserProfile } from "../../../../store/mobx/users/classes/UserProfile/UserProfile";
import { Grave } from "../../../../types/Grave";
import { UserRoles } from "../../../../types/User";
import { useDeleteGrave } from "../../../../utils/hooks/graves/useDeleteGrave/useDeleteGrave";
import { useGetGraveReturnType } from "../../../../utils/hooks/graves/useGetGrave/useGetGrave";
import { useUpdateGrave } from "../../../../utils/hooks/graves/useUpdateGrave/useUpdateGrave";
import { useReturnUserStore } from "../../../../utils/hooks/mobx/users/useReturnUserStore";
import { mapDateTo } from "../../../../utils/mappers/date/mapDate";
import { EditableField } from "../../../common/EditableField/EditableField";
import { HEADER_HEIGHT } from "../../../common/Header/Header";
import { Alert } from "../../../common/Modal/Alert/Alert";
import { CommonModal } from "../../../common/Modal/CommonModal/CommonModal";
import { format } from "date-fns";
import { BsFillCalendarDateFill } from "react-icons/bs";

export const GraveProfile = observer((props: useGetGraveReturnType) => {
  const { grave, refreshGrave } = props;
  const { updateGraveMessages, updateGrave } = useUpdateGrave();
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

  const {
    isOpen: isEditBornModalOpen,
    onOpen: openEditBornModal,
    onClose: closeEditBornModal,
  } = useDisclosure();

  const {
    isOpen: isEditDiedModalOpen,
    onOpen: openEditDiedModal,
    onClose: closeEditDiedModal,
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

  const changeBornDate = async (date: string) => {
    if (!grave) return console.error("No grave to change date on!");
    await updateGrave({ born: date, _id: grave?._id });
    grave.born = date;
    closeEditBornModal();
  };

  const changeDiedDate = async (date: string) => {
    if (!grave) return console.error("No grave to change date on!");
    await updateGrave({ died: date, _id: grave?._id });
    grave.died = date;
    closeEditDiedModal();
  };

  if (!grave) return null;

  return (
    <>
      {isEditBornModalOpen && (
        <EditDate
          isOpen={isEditBornModalOpen}
          onCancel={closeEditBornModal}
          onConfirm={(date) => changeBornDate(date)}
          dateDefault={grave.born}
          type="born"
        />
      )}
      {isEditDiedModalOpen && (
        <EditDate
          isOpen={isEditDiedModalOpen}
          onCancel={closeEditDiedModal}
          onConfirm={(date) => changeDiedDate(date)}
          dateDefault={grave.died}
          type="died"
        />
      )}
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
          <EditableField
            as={Heading}
            Component={() => <Heading>{grave.name}</Heading>}
            defaultValue={grave.name}
            keyToUpdate="name"
            onUpdate={async (args) => updateGrave({ ...args, _id: grave._id })}
            validationFunction={() => canUserEdit(grave, user)}
            input={{ type: "text" }}
          />
        </GridItem>
        <GridItem
          area="close"
          as={Flex}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <SvgWrapper transform="rotate(180deg)">
            <BiExit onClick={() => history.push(routes.graves.root)} />
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
              <Text
                variant="caption"
                onClick={
                  canUserEdit(grave, user) ? openEditBornModal : () => {}
                }
              >
                Родился: {mapDateTo("DDMMYYYY", grave.born)}
              </Text>
              <Text
                variant="caption"
                onClick={
                  canUserEdit(grave, user) ? openEditDiedModal : () => {}
                }
              >
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
          <EditableField
            as={Text}
            Component={() => <Text>{grave?.lastWords}</Text>}
            defaultValue={grave?.lastWords}
            keyToUpdate="lastWords"
            onUpdate={async (args) => updateGrave({ ...args, _id: grave._id })}
            validationFunction={() => canUserEdit(grave, user)}
            textarea={{}}
          />
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

type EditDateProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (date: string) => void;
  dateDefault: string;
  type: "born" | "died";
};

const EditDate = (props: EditDateProps) => {
  const { isOpen, onCancel, onConfirm, dateDefault, type } = props;
  const [date, setDate] = useState(dateDefault);

  const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value).toISOString());
  };

  const formattedDate = format(new Date(date), "yyyy-MM-dd");
  const formattedDate2 = format(new Date(date), "dd/MM/yyyy");

  const dict = {
    born: "рождения",
    died: "смерти",
  };

  return (
    <CommonModal
      isOpen={isOpen}
      confirmButton={{
        onClick: () => onConfirm(date),
      }}
      cancelButton={{
        onClick: onCancel,
      }}
      onClose={onCancel}
      title={`Изменить дату ${dict[type]}`}
    >
      <Box pos="relative">
        <Input
          type="text"
          pointerEvents="none"
          value={formattedDate2}
          readOnly
          pos="absolute"
          width="100%"
        />
        <Box pos={"absolute"} right="15px" top="50%" transform="translateY(-50%)">
          <BsFillCalendarDateFill />
        </Box>
        <Input
          type="date"
          value={formattedDate}
          onChange={changeDate}
          opacity={0}
        />
      </Box>
    </CommonModal>
  );
};

const canUserEdit = (grave: Grave, user?: UserProfile) =>
  user?.role === UserRoles.admin || user?._id === grave.madeBy.id;

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
