
export enum CodeMD {
    ID = "codemd",
    TITLE = ID,
    TITLE_ZH = "源代码",
    CMD_ID = "MceCodeEditorMD",
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




