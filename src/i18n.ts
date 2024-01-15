import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import trJSON from "./locale/tr.json";

const resources = {
    en:{
        translation:enJSON,
    },
    tr:{
        translation:trJSON
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng:"tr", // default language
})

export default i18n;