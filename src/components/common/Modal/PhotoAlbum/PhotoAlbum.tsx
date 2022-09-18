import {
  Grid,
  GridItem,
  Center,
  Image,
  Text,
  Button,
  Flex,
  VStack,
  Fade,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Photo } from "../../../../types/Photo";
import { FileExtended } from "../../../../utils/comperssors/photos/compressPhotos";
import { usePhotos } from "../../../../utils/hooks/photos/usePhotos";
import { ButtonWithInput } from "../../Buttons/ButtonWithInput";

type PhotoAlbumProps = {
  photos: Photo[];
  _id: string;
  onSave: (
    newPhotosFiles: FileExtended[],
    oldPhotosUrls: Photo[]
  ) => Promise<void>;
  canUserEdit: boolean;
};

export const PhotoAlbum = observer((props: PhotoAlbumProps) => {
  const { photos: alreadyUploadedPhotosUrls, onSave, canUserEdit } = props;
  const {
    addPhotosFiles,
    setUploadedPhotosUrls,
    isLoading,
    photosUrls,
    setPhotosUrls,
    newPhotosFiles,
    deletePhotos,
    uploadedPhotosUrls,
    chosenPhotosUrls,
    choosePhotoByUrl,
    makeAsAvatar,
  } = usePhotos();

  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    setUploadedPhotosUrls(alreadyUploadedPhotosUrls);
    setPhotosUrls(alreadyUploadedPhotosUrls);
  }, [alreadyUploadedPhotosUrls, setPhotosUrls, setUploadedPhotosUrls]);

  const save = async () => {
    setSaving(true);
    try {
      await onSave(newPhotosFiles, uploadedPhotosUrls);
    } finally {
      setSaving(false);
    }
  };

  return photosUrls.length > 0 ? (
    <>
      <Grid
        gap="10px"
        gridTemplateColumns="repeat(3, calc(33% - 10px))"
        gridAutoRows="100px"
        width="100%"
        height="100%"
        justifyContent="space-between"
        p={3}
      >
        {photosUrls.map((photo: Photo, index: number) => {
          return (
            <GridItem
              bg="white"
              key={photo.url}
              shadow="base"
              as={Center}
              css={{
                svg: {
                  width: "60%",
                  height: "60%",
                },
              }}
              overflow="hidden"
              border={
                chosenPhotosUrls.find(
                  (chosenPhoto) => chosenPhoto.url === photo.url
                )
                  ? "2px solid"
                  : "none"
              }
              borderColor="blue.300"
              onClick={() => choosePhotoByUrl(photo)}
            >
              <Image src={photo.url} />
            </GridItem>
          );
        })}
      </Grid>
      <VStack mt={5}>
        <Center
          in={chosenPhotosUrls.length > 0 && canUserEdit}
          as={Fade}
          w="100%"
        >
          {chosenPhotosUrls.length > 0 && canUserEdit && (
            <Button
              w="100%"
              colorScheme="red"
              onClick={() => deletePhotos(chosenPhotosUrls)}
            >
              Удалить
            </Button>
          )}
        </Center>
        <Center
          in={chosenPhotosUrls.length === 1 && canUserEdit}
          as={Fade}
          w="100%"
        >
          {chosenPhotosUrls.length === 1 && canUserEdit && (
            <Button
              w="100%"
              disabled={chosenPhotosUrls[0].isAvatar}
              onClick={() => makeAsAvatar(chosenPhotosUrls[0].url)}
            >
              Сделать главной
            </Button>
          )}
        </Center>
        {canUserEdit && (
          <Flex w="100%">
            <ButtonWithInput
              text="Добавить"
              colorScheme="blue"
              handler={addPhotosFiles}
              flex={1}
              isLoading={isLoading}
            />
            <Button onClick={save} flex={1} ml={2} isLoading={isSaving}>
              Сохранить
            </Button>
          </Flex>
        )}
      </VStack>
    </>
  ) : (
    <Flex direction={"column"}>
      <Text variant="caption">
        У данного покойника нет фотографий
        {canUserEdit ? ", но вы можете их добавить!" : "."}
      </Text>
      <Flex w="100%" mt={5}>
        <ButtonWithInput
          text="Добавить"
          colorScheme="blue"
          handler={addPhotosFiles}
          flex={1}
          isLoading={isLoading}
        />
        {canUserEdit && (
          <Button onClick={save} flex={1} ml={2} isLoading={isSaving}>
            Сохранить
          </Button>
        )}
      </Flex>
    </Flex>
  );
});
