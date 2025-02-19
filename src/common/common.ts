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

    logLevel?: 'debug' | 'info' | 'warn' | 'error'
}

/// 延迟多少时间执行, 单位 ms
export const delayExec = (execFun: (...args:[]) => any, delay = 500) => {
    setTimeout(() => {
        execFun()
    }, delay)
}

/// 从官方 pre > code 解析源码修改
///     turndown 源码位置: src/commonmark-rules.js, 101 行, rules.fencedCodeBlock = ...
export const originTurnDownRep = (
    // 代码块文本
    content: string,
    // HTMLElement
    node: HTMLElement,
    // new TurndownService() 时传进来的参数 + 默认参数
    options: any
) => {

    // console.log(
    //     "originTurnDownRep args: ",
    //     content,
    //     node,
    //     options,
    // )
    // const className = (node.firstChild as HTMLElement).getAttribute('class') || ''
    const className = node.firstElementChild.getAttribute('class') || ''
    const language = (className.match(/language-(\S+)/) || [null, ''])[1]
    const code = node.firstChild.textContent

    const fenceChar = options.fence.charAt(0)
    let fenceSize = 3
    const fenceInCodeRegex = new RegExp('^' + fenceChar + '{3,}', 'gm')

    let match
    while ((match = fenceInCodeRegex.exec(code))) {
        if (match[0].length >= fenceSize) {
            fenceSize = match[0].length + 1
        }
    }

    const repeat = (character: string, count: number) => {
        return Array(count + 1).join(character)
    }

    const fence = repeat(fenceChar, fenceSize)

    return (
        '\n\n' + fence + language + '\n' +
        // code.replace(/\n$/, '') +
        code.trim() +
        '\n' + fence + '\n\n'
    )
}





