import * as yup from "yup";
import i18n from "@shared/i18n";

const isRequired = i18n.t("validate.required");
const isNotEmail = i18n.t("validate.isNotEmail");

export const userValidationSchema = yup.object({
  name: yup.string().required(isRequired),
  username: yup.string().required(isRequired),
  email: yup.string().required(isRequired).email(isNotEmail),
  phone: yup
    .string()
    .required(isRequired)
    .matches(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/, isRequired),
  address: yup.object({
    zipcode: yup.string(),
  }),
});

export type TUserValidationSchema = yup.InferType<typeof userValidationSchema>;
