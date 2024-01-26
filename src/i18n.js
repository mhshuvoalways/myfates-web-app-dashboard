import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EnTran from "../public/locales/en/en.json";
import JpTran from "../public/locales/jp/jp.json";

const resources = {
  en: {
    translation: EnTran,
  },
  jp: {
    translation: JpTran,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
