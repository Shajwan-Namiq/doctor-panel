import { createI18n } from "vue-i18n";
import en from "./en.json";
import ku from "./ku.json";
import ar from "./ar.json";
import { Language } from "@/backend/auth/models/Language";

type MessageSchema = typeof en;

const i18n = createI18n<[MessageSchema], "en" | "ku">({
  locale: localStorage.getItem("language") ?? Language.EN,
  messages: {
    En: en,
    Ckb: ku,
    Ar: ar,
  },
});
export default i18n;
