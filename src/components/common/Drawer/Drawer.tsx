import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Drawer,
  DrawerOverlay,
  Input,
  GridItem,
  Text,
  Center,
  Textarea,
  VStack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext } from "react";
import { DrawerContext } from "../../../contexts/drawer-context/drawer-context";
import { graveSchema } from "../../../models/yup/yup-schemas";
import { HeaderLayout } from "../../layouts/HeaderLayout/HeaderLayout";

export function DrawerLeft() {
  const { isOpen, onClose } = useContext(DrawerContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      born: "",
      died: "",
      lastWords: "",
      photos: [""],
    },
    validationSchema: graveSchema,
    onSubmit: (values) => {
      console.log("Implement. ", values);
    },
  });

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader p={0}>
            <HeaderLayout>
              <DrawerCloseButton />
              <GridItem area="body" as={Center}>
                <Text>Создать могилу</Text>
              </GridItem>
            </HeaderLayout>
          </DrawerHeader>

          <form onSubmit={formik.handleSubmit}>
            <DrawerBody>
              <VStack>
                <FormControl
                  isInvalid={!!formik.touched.name && !!formik.errors.name}
                >
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
                <FormControl
                  isInvalid={!!formik.touched.born && !!formik.errors.born}
                >
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
                <FormControl
                  isInvalid={!!formik.touched.died && !!formik.errors.died}
                >
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
                  isInvalid={
                    !!formik.touched.lastWords && !!formik.errors.lastWords
                  }
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
                <Input placeholder="Фотографии" type="text" />
              </VStack>
            </DrawerBody>

            <DrawerFooter justifyContent="space-between">
              <Button variant="outline" mr={3} onClick={onClose}>
                Отменить
              </Button>
              <Button type="submit">Сохранить</Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
