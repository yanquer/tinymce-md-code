import {langZh} from "../lang/lang-zh";

export enum CodeMD {
    ID = "codemd",
    CMD_ID = "MceCodeEditorMD",

    TITLE = "Md Code",
    // @ts-ignore
    TITLE_ZH = langZh["Md Code"],
    TITLE_RESET = "Html Code",
    // @ts-ignore
    TITLE_RESET_ZH = langZh["Html Code"],
}

export enum TextType {
    TEXT = "text",
    RAW = 'raw',
    HTML = 'html',
    TREE = 'tree',
}


export type IFTextHandler = (text: string) => string
export interface CodeMdOptions {
    htmlToMd?: IFTextHandler,
    mdToHtml?: IFTextHandler,
}

/// 延迟多少时间执行, 单位 ms
export const delayExec = (execFun: (...args:[]) => any, delay = 500) => {
    setTimeout(() => {
        execFun()
    }, delay)
}




