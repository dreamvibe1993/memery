import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, Redirect, useHistory } from "react-router-dom";
import { routes } from "../../../configs/urls/app/app-urls";
import { regSchema } from "../../../models/yup/yup-schemas";
import { useRegisterUser } from "../../../utils/hooks/users/useRegisterUser";
import { InputWithErrorState } from "../Forms/InputWithErrorState/InputWithErrorState";
import userStore from "../../../store/mobx/users/users";
import { observer } from "mobx-react-lite";

export const SignupCard = observer(() => {
  const { register } = useRegisterUser();
  const history = useHistory();
  const { isLoggedIn } = userStore;

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: regSchema,
    onSubmit: async (validated) => {
      await register(validated);
      history.push(routes.login.root);
    },
  });

  const inputs = [
    {
      isInvalid: !!formik.touched.name && !!formik.errors.name,
      type: "text",
      name: "name",
      handleChange: formik.handleChange,
      value: formik.values.name,
      errorMessage: formik.errors.name,
      isRequired: true,
      label: "Имя",
    },
    {
      isInvalid: !!formik.touched.email && !!formik.errors.email,
      type: "email",
      name: "email",
      handleChange: formik.handleChange,
      value: formik.values.email,
      errorMessage: formik.errors.email,
      isRequired: true,
      label: "Мыло",
    },
    {
      isInvalid: !!formik.touched.password && !!formik.errors.password,
      type: "password",
      name: "password",
      handleChange: formik.handleChange,
      value: formik.values.password,
      errorMessage: formik.errors.password,
      isRequired: true,
      label: "Пароль",
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

  if (isLoggedIn) return <Redirect to={routes.login.root} />;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={colmodvalue1}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Регистрируйся
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              чтобы похоронить кого-нибудь!
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={colmodvalue2} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              {inputs.map((input, i) => {
                return <InputWithErrorState key={i} {...input} />;
              })}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Регистрирую..."
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Зарегистрироваться
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Уже зарегистрировались?{" "}
                  <ChakraLink
                    as={Link}
                    to={routes.login.root}
                    color={"blue.400"}
                  >
                    Авторизоваться
                  </ChakraLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
});
