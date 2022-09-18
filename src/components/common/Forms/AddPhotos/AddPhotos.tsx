import { Center, Spinner, VStack } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import {
  usePhotos,
} from "../../../../utils/hooks/photos/usePhotos";
import { ButtonWithInput } from "../../Buttons/ButtonWithInput";

export const AddPhotos = (props: ReturnType<typeof usePhotos>) => {
  const { newPhotosFiles, isLoading, addPhotosFiles, deletePhotoFile } = props;
  return (
    <VStack maxH="240px" overflowY="auto" w="100%" pos="relative">
      <Center bg="white" pos="sticky" top="0" w="100%" py={2} zIndex={10}>
        {newPhotosFiles.length < 1 ? (
          <ButtonWithInput text="ДОБАВИТЬ ФОТО" handler={(e) => addPhotosFiles(e)} />
        ) : (
          <ButtonWithInput
            text="ДОБАВИТЬ БОЛЬШЕ"
            handler={(e) => addPhotosFiles(e)}
          />
        )}
      </Center>
      {newPhotosFiles.map((blob) => (
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
              <AiOutlineClose onClick={() => deletePhotoFile(blob.id)} />
              <LilPic src={blob.url} />
            </>
          )}
        </Center>
      ))}
    </VStack>
  );
};

const LilPic = styled.img`
  height: 100%;
  margin: 0px 5px;
`;
