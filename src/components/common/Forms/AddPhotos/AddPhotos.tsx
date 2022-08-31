import { Button, Center, Input, Spinner, VStack } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { UsePhotosReturnType } from "../../../../utils/hooks/photos/usePhotos";

export const AddPhotos = (props: UsePhotosReturnType) => {
  const { photos, isLoading, deletePhoto, addPhoto } = props;

  return (
    <VStack maxH="240px" overflowY="auto" w="100%" pos="relative">
      <Center bg="white" pos="sticky" top="0" w="100%" py={2} zIndex={10}>
        {photos.length < 1 ? (
          <ButtonWithInput text="ДОБАВИТЬ ФОТО" handler={(e) => addPhoto(e)} />
        ) : (
          <ButtonWithInput
            text="ДОБАВИТЬ БОЛЬШЕ"
            handler={(e) => addPhoto(e)}
          />
        )}
      </Center>
      {photos.map((blob) => (
        <Center
          key={blob.id}
          mb={10}
          pos="relative"
          zIndex={9}
          css={{
            svg: {
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "white",
              borderRadius: "100%",
              padding: "2px",
              border: "1px solid grey",
            },
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <AiOutlineClose onClick={() => deletePhoto(blob.id)} />
              <LilPic src={blob.url} />
            </>
          )}
        </Center>
      ))}
    </VStack>
  );
};

const ButtonWithInput = (props: {
  text: string;
  handler: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <Button w="100%">
      {props.text}
      <FileInput
        type="file"
        accept="image/*"
        multiple
        onChange={props.handler}
        opacity={0}
        pos
      />
    </Button>
  );
};

const LilPic = styled.img`
  height: 100%;
  margin: 0px 5px;
`;

const FileInput = styled(Input)`
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
