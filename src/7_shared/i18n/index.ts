import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ru } from "./langs/ru";

export const initI18n = () => {};

const resources = {
  ru: { translation: ru },
};

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: "ru",
  keySeparator: ".",
  ns: ["translation"],
  defaultNS: "translation",
});

export default i18next;
