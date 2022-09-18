import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Img,
  Text,
  Textarea,
  TransformProps,
  useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import {
  BiExit,
  BiMessageRoundedEdit,
  BiPhotoAlbum,
  BiTrash,
} from "react-icons/bi";
import { useHistory } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { API_V1_PHOTOS } from "../../../../configs/urls/api/api-urls";
import { ORIGIN, routes } from "../../../../configs/urls/app/app-urls";
import { UserProfile } from "../../../../store/mobx/users/classes/UserProfile/UserProfile";
import { Grave } from "../../../../types/Grave";
import { Photo } from "../../../../types/Photo";
import { UserRoles } from "../../../../types/User";
import { FileExtended } from "../../../../utils/comperssors/photos/compressPhotos";
import { useGraveContext } from "../../../../utils/hooks/contexts/useGraveContext/useGraveContext";
import { useDeleteGrave } from "../../../../utils/hooks/graves/useDeleteGrave/useDeleteGrave";
import { useUpdateGrave } from "../../../../utils/hooks/graves/useUpdateGrave/useUpdateGrave";
import { useReturnUserStore } from "../../../../utils/hooks/mobx/users/useReturnUserStore";
import { usePhotos } from "../../../../utils/hooks/photos/usePhotos";
import { mapDateTo } from "../../../../utils/mappers/date/mapDate";
import { EditableField } from "../../../common/EditableField/EditableField";
import { HEADER_HEIGHT } from "../../../common/Header/Header";
import { Alert } from "../../../common/Modal/Alert/Alert";
import { CommonModal } from "../../../common/Modal/CommonModal/CommonModal";
import { EditDate } from "../../../common/Modal/EditDate/EditDate";
import { PhotoAlbum } from "../../../common/Modal/PhotoAlbum/PhotoAlbum";

export const GraveProfile = observer(() => {
  const { refreshGrave, grave } = useGraveContext();
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
    isOpen: isPhotosOpen,
    onOpen: openPhotos,
    onClose: closePhotos,
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

  const { uploadPhotos } = usePhotos();

  const updateGravePhotos = async (
    newPhotos: FileExtended[],
    oldPhotos: Photo[]
  ) => {
    if (!grave?._id) return console.error("Can not update grave without ID!");
    const photos = await uploadPhotos(
      newPhotos,
      `${ORIGIN}${API_V1_PHOTOS}/graves`
    );
    const updatedGrave = await updateGrave({
      photos: [
        ...photos.map((photo: { name: string; url: string }) => ({
          url: photo.url,
          isAvatar: !!newPhotos.find((f) => f.file.name === photo.name)
            ?.isAvatar,
        })),
        ...oldPhotos,
      ],
      _id: grave._id,
    });
    if (!updatedGrave) return console.error("Updated grave was not received!");
    refreshGrave();
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
          ofWhat="рождения"
        />
      )}
      {isEditDiedModalOpen && (
        <EditDate
          isOpen={isEditDiedModalOpen}
          onCancel={closeEditDiedModal}
          onConfirm={(date) => changeDiedDate(date)}
          dateDefault={grave.died}
          ofWhat="смерти"
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
      <CommonModal
        isOpen={isPhotosOpen}
        onClose={closePhotos}
        title="Фотографии покойника"
      >
        <PhotoAlbum
          photos={grave.photos}
          _id={grave._id}
          onSave={(newPhotos, oldPhotos) =>
            updateGravePhotos(newPhotos, oldPhotos)
          }
          canUserEdit={canUserEdit(grave, user)}
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
              overflow="hidden"
            >
              {isPhotoGalleryOpen && (
                <ImageViewer
                  src={grave.photos.map((photo) => photo.url)}
                  onClose={closePhotoGallery}
                  disableScroll={true}
                  closeOnClickOutside={true}
                />
              )}
              <Img
                src={
                  grave?.photos?.find((photo) => photo.isAvatar)?.url ||
                  "https://via.placeholder.com/150/000000/FFFFFF/?text=Пусто"
                }
                onClick={openPhotoGallery}
                cursor="pointer"
              />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          area={"cell3"}
          as={Flex}
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
          pt="40px"
        >
          <SvgWrapper>
            <BiPhotoAlbum onClick={openPhotos} />
          </SvgWrapper>
        </GridItem>

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
