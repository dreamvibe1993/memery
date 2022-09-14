import {
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { Redirect, useHistory } from "react-router-dom";
import { routes } from "../../../configs/urls/app/app-urls";
import { passChangeSchema } from "../../../models/yup/yup-schemas";
import userStore from "../../../store/mobx/users/users";
import { useQuery } from "../../../utils/hooks/common/useQuery";
import { useUpdateUser } from "../../../utils/hooks/users/useUpdateUser";
import { InputWithErrorState } from "../../common/Forms/InputWithErrorState/InputWithErrorState";

export const PassChangeCard = observer(() => {
  const { isLoggedIn } = userStore;
  const queryParams = useQuery();
  const token = queryParams.get("token");
  const { submitNewPassword } = useUpdateUser();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: passChangeSchema,
    onSubmit: async (validated) => {
      if (!token) return;
      try {
        await submitNewPassword({ ...validated, token });
        history.push(routes.login.root);
      } catch (e) {
        console.error(e);
      }
    },
  });

  const inputs = [
    {
      isInvalid: !!formik.touched.password && !!formik.errors.password,
      type: "password",
      name: "password",
      handleChange: formik.handleChange,
      value: formik.values.password,
      errorMessage: formik.errors.password,
      isRequired: true,
      label: "Новый пароль",
    },
    {
      isInvalid:
        !!formik.touched.passwordConfirm && !!formik.errors.passwordConfirm,
      type: "password",
      name: "passwordConfirm",
      handleChange: formik.handleChange,
      value: formik.values.passwordConfirm,
      errorMessage: formik.errors.passwordConfirm,
      isRequired: true,
      label: "Повторите пароль",
    },
  ];

  const colmodvalue1 = useColorModeValue("gray.50", "gray.800");
  const colmodvalue2 = useColorModeValue("white", "gray.700");

  if (isLoggedIn || !token) return <Redirect to={routes.login.root} />;

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={colmodvalue1}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Давайте
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            поменяем пароль
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={colmodvalue2} boxShadow={"lg"} p={8}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              {inputs.map((input, i) => {
                return (
                  <InputWithErrorState
                    key={i + input.handleChange.toString()}
                    {...input}
                  />
                );
              })}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Изменяю..."
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Изменить пароль
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
});
