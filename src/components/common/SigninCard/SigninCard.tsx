import {
  Flex,
  Box,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  Spinner,
  VStack,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { routes } from "../../../configs/urls/app/app-urls";
import { loginSchema } from "../../../models/yup/yup-schemas";
import { useLoginUser } from "../../../utils/hooks/users/useLoginUser";
import { InputWithErrorState } from "../Forms/InputWithErrorState/InputWithErrorState";
import userStore from "../../../store/mobx/users/users";
import { HEADER_HEIGHT } from "../Header/Header";
import { observer } from "mobx-react-lite";

export const SigninCard = observer(() => {
  const { login, logout } = useLoginUser();
  const { isLoggedIn, user } = userStore;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (validated) => {
      await login(validated);
    },
  });

  const inputs = [
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
  ];

  const colmodvalue1 = useColorModeValue("gray.50", "gray.800");
  const colmodvalue2 = useColorModeValue("white", "gray.700");

  if (isLoggedIn === undefined) {
    return (
      <Center h={`calc(100vh - ${HEADER_HEIGHT}px)`} bg={colmodvalue1} w="100%">
        <Spinner />
      </Center>
    );
  }

  if (isLoggedIn === true) {
    return (
      <VStack h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
        <Center flex={1} w="70%">
          <Box textAlign="center">
            <Heading fontSize={"4xl"}>Вы успешно вошли</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              в
              <ChakraLink as={Link} to={routes.graves.root} color={"blue.400"}>
                {" "}
                аккаунт
              </ChakraLink>
              , {user?.name}!✌️
            </Text>
          </Box>
        </Center>
        <Center flex={1}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
            onClick={logout}
          >
            Выйти
          </Button>
        </Center>
      </VStack>
    );
  }

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
            <Heading fontSize={"4xl"}>Вход в аккаунт</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              чтобы{" "}
              <ChakraLink as={Link} to={routes.graves.root} color={"blue.400"}>
                начать хоронить!
              </ChakraLink>{" "}
              ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={colmodvalue2} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              {inputs.map((input, i) => {
                return <InputWithErrorState key={i} {...input} />;
              })}
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <ChakraLink color={"blue.400"}>Забыт пароль?</ChakraLink>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Войти
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
});
