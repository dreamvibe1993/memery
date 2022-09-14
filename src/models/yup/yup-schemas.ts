import * as yup from "yup";

//сообщения писать в required

export const graveSchema = yup.object().shape({
  photos: yup.array().max(4, "Please delete some pictures. Max number is 4."),
  lastWords: yup
    .string()
    .max(
      32,
      "Maximum length of the person's last words is 32. Please be more brief."
    ),
  died: yup
    .date()
    .required("Please provide the date of death")
    .min(yup.ref("born"), "Person can not die before they born."),
  born: yup
    .date()
    .required("Please provide the date of death")
    .max(yup.ref("died"), "Person can not born after they die."),
  name: yup.string().required().min(2),
});

export const giftSchema = yup.object().shape({
  name: yup.string().required("Please enter your name.").min(2).max(15),
  gift: yup.string().required("You forgot to pick a gift!"),
  wish: yup.string().max(30),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is strongly required"),
  password: yup
    .string()
    .required("Password is strongly required!")
    .min(8, "Minimum password's length is 8 symbols."),
});

export const regSchema = yup.object().shape({
  passwordConfirm: yup
    .string()
    .required("Please confirm your password")
    .min(8, "Minimum password's length is 8 symbols.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  password: yup
    .string()
    .required("Password is strongly required!")
    .min(8, "Minimum password's length is 8 symbols."),
  email: yup.string().email().required("Email is strongly required"),
  name: yup
    .string()
    .required("Please provide us your name.")
    .max(20, "Maximum name's length is 20 symbols."),
});

export const profileSchema = yup.object().shape({
  email: yup.string().email().required("Email is strongly required"),
  name: yup
    .string()
    .required("Please provide us your name.")
    .max(20, "Maximum name's length is 20 symbols."),
});

export const forgotPassSchema = yup.object().shape({
  email: yup.string().email().required("Email is strongly required"),
});

export const passChangeSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is strongly required!")
    .min(8, "Minimum password's length is 8 symbols.")
    .oneOf([yup.ref("passwordConfirm"), null], "Passwords must match"),
  passwordConfirm: yup
    .string()
    .required("Please confirm your password")
    .min(8, "Minimum password's length is 8 symbols.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
