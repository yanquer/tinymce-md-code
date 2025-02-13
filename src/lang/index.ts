
import {langZh, langZhId} from "./lang-zh";

export const registerLang = (addLang: (langId: string, langMap: any) => void) => {
    addLang(langZhId, langZh)
}


