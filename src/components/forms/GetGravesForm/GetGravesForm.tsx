import {
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
  Center,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { graveSchema } from "../../../models/yup/yup-schemas";
import {
  compressPhotos,
  FileExtended,
} from "../../../utils/comperssors/photos/compressPhotos";
import { AiOutlineClose } from "react-icons/ai";
import { usePostGrave } from "../../../utils/hooks/graves/usePostGrave/usePostGrave";

export type GetGravesFormProps = { handleAfterSubmit?: () => void };

export const GetGravesForm = forwardRef((props: GetGravesFormProps) => {
  const { handleAfterSubmit = () => {} } = props;
  const { postNewGrave } = usePostGrave();
  const [l, setL] = useState(false);
  const [photos, setPhotos] = useState<Array<FileExtended>>([]);

  const deletePhoto = (id: string): void => {
    setPhotos((prev) => prev.filter((blob) => blob.id !== id));
  };

  const createPhotosBlobs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setL(true);
      const ph = await compressPhotos(e);
      setPhotos((prev) => [...prev, ...ph]);
      setL(false);
    } catch (e) {
      setL(false);
      console.error(e);
      console.trace(e);
      alert(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      born: "",
      died: "",
      lastWords: "",
      photos,
    },
    validationSchema: graveSchema,
    onSubmit: async (values) => {
      await postNewGrave({ ...values, photos });
      handleAfterSubmit();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} id="get-graves-form">
      <VStack>
        <FormControl isInvalid={!!formik.touched.name && !!formik.errors.name}>
          {/* <FormLabel htmlFor="name">Имя</FormLabel> */}
          <Input
            placeholder="Введите имя"
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formik.touched.born && !!formik.errors.born}>
          {/* <FormLabel htmlFor="born">Дата рождения</FormLabel> */}
          <Input
            placeholder="Введите дату рождения"
            type="date"
            id="born"
            name="born"
            onChange={formik.handleChange}
            value={formik.values.born}
          />
          <FormErrorMessage>{formik.errors.born}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formik.touched.died && !!formik.errors.died}>
          {/* <FormLabel htmlFor="died">Дата смерти</FormLabel> */}
          <Input
            placeholder="Введите дату смерти"
            type="date"
            id="died"
            name="died"
            onChange={formik.handleChange}
            value={formik.values.died}
          />
          <FormErrorMessage>{formik.errors.died}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!formik.touched.lastWords && !!formik.errors.lastWords}
        >
          {/* <FormLabel htmlFor="lastWords">Последние слова</FormLabel> */}
          <Textarea
            placeholder="Последние слова этого человека"
            resize="none"
            id="lastWords"
            name="lastWords"
            onChange={formik.handleChange}
            value={formik.values.lastWords}
            required
          />
          <FormErrorMessage>{formik.errors.lastWords}</FormErrorMessage>
        </FormControl>
        <VStack maxH="240px" overflowY="auto" w="100%" pos="relative">
          <Center bg="white" pos="sticky" top="0" w="100%" py={2} zIndex={10}>
            {photos.length < 1 ? (
              <ButtonWithInput
                text="ДОБАВИТЬ ФОТО"
                handler={(e) => createPhotosBlobs(e)}
              />
            ) : (
              <ButtonWithInput
                text="ДОБАВИТЬ БОЛЬШЕ"
                handler={(e) => createPhotosBlobs(e)}
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
              {l ? (
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
      </VStack>
    </form>
  );
});

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
