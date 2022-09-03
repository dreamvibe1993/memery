import { Center, Fade, Spinner, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { graveSchema } from "../../../models/yup/yup-schemas";
import { usePostGrave } from "../../../utils/hooks/graves/usePostGrave/usePostGrave";
import { usePhotos } from "../../../utils/hooks/photos/usePhotos";
import { InputWithErrorState } from "../../common/Forms/InputWithErrorState/InputWithErrorState";
import { TextareaWithErrorState } from "../../common/Forms/TextareaWithErrorState/TextareaWithErrorState";
import { AddPhotos } from "../../common/Forms/AddPhotos/AddPhotos";

export type AddGraveFormProps = { handleAfterSubmit?: () => void };

export const AddGraveForm = (props: AddGraveFormProps) => {
  const { handleAfterSubmit = () => {} } = props;
  const { postNewGrave, isLoading: isPostingInProgress } = usePostGrave();
  const photoUtils = usePhotos();

  const formik = useFormik({
    initialValues: {
      name: "",
      born: "",
      died: "",
      lastWords: "",
      photos: photoUtils.photos,
    },
    validationSchema: graveSchema,
    onSubmit: async (values) => {
      await postNewGrave({ ...values, photos: photoUtils.photos });
      handleAfterSubmit();
    },
  });

  const inputs = [
    {
      isInvalid: !!formik.touched.name && !!formik.errors.name,
      placeholder: "Введите имя",
      type: "text",
      name: "name",
      onChange: formik.handleChange,
      value: formik.values.name,
      errorMessage: formik.errors.name,
    },
    {
      isInvalid: !!formik.touched.born && !!formik.errors.born,
      placeholder: "Введите дату рождения",
      type: "date",
      name: "born",
      onChange: formik.handleChange,
      value: formik.values.born,
      errorMessage: formik.errors.born,
    },
    {
      isInvalid: !!formik.touched.died && !!formik.errors.died,
      placeholder: "Введите дату смерти",
      type: "date",
      name: "died",
      onChange: formik.handleChange,
      value: formik.values.died,
      errorMessage: formik.errors.died,
    },
  ];

  const txtareas = [
    {
      isInvalid: !!formik.touched.lastWords && !!formik.errors.lastWords,
      placeholder: "Последние слова этого человека",
      name: "lastWords",
      onChange: formik.handleChange,
      value: formik.values.lastWords,
      errorMessage: formik.errors.lastWords,
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit} id="add-graves-form">
      <VStack pos="relative">
        <Fade in={isPostingInProgress}>
          {isPostingInProgress ? (
            <Center
              pos="absolute"
              h="100%"
              w="100%"
              opacity="0.5"
              zIndex={90}
              bgColor="white"
              top="0"
              left="0"
            >
              <Spinner />
            </Center>
          ) : null}
        </Fade>
        {inputs.map((input) => (
          <InputWithErrorState
            key={input.name}
            isInvalid={input.isInvalid}
            placeholder={input.placeholder}
            type={input.type}
            name={input.name}
            handleChange={input.onChange}
            value={input.value}
            errorMessage={input.errorMessage}
          />
        ))}
        {txtareas.map((textarea) => (
          <TextareaWithErrorState
            key={textarea.name}
            isInvalid={textarea.isInvalid}
            placeholder={textarea.placeholder}
            name={textarea.name}
            handleChange={textarea.onChange}
            value={textarea.value}
            errorMessage={textarea.errorMessage}
          />
        ))}
        <AddPhotos {...photoUtils} />
      </VStack>
    </form>
  );
};
