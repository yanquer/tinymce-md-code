
export namespace CodeMD {
    export const ID = "codemd"
    export const CMD_ID = "MceCodeEditorMD"
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


