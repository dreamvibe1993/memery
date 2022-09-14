import { FormControl, useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import { forgotPassSchema } from "../../../models/yup/yup-schemas";
import { UseDisclosureReturnType } from "../../../types/common/UseDisclosureReturnType";
import { useUpdateUser } from "../../../utils/hooks/users/useUpdateUser";
import { InputWithErrorState } from "../../common/Forms/InputWithErrorState/InputWithErrorState";
import { CommonModal } from "../../common/Modal/CommonModal/CommonModal";

export const ForgotPassword = (props: UseDisclosureReturnType) => {
  const disclosure = useDisclosure();
  const forgotPasswordModalUtils = props || disclosure;
  const { sendResetPasswordLink } = useUpdateUser();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPassSchema,
    onSubmit: async (validated) => {
      try {
        await sendResetPasswordLink(validated.email);
        forgotPasswordModalUtils.onClose();
      } catch (e) {}
    },
  });

  return (
    <CommonModal
      title="Забыли пароль?"
      {...forgotPasswordModalUtils}
      confirmButton={{
        title: "Отправить письмо",
        type: "submit",
        form: "forgot-password",
      }}
      cancelButton={{
        title: "Отмена",
        onClick: forgotPasswordModalUtils.onClose,
      }}
    >
      <form onSubmit={formik.handleSubmit} id="forgot-password">
        <FormControl>
          <InputWithErrorState
            label="Укажите email, использованный при регистрации: "
            errorMessage={formik.errors.email}
            handleChange={formik.handleChange}
            isInvalid={!!formik.touched.email && !!formik.errors.email}
            name="email"
            type="email"
            value={formik.values.email}
          />
        </FormControl>
      </form>
    </CommonModal>
  );
};
