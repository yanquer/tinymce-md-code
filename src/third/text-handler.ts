import {Editor} from "tinymce";
import {CodeMD, CodeMdOptions, IFTextHandler} from "../common/common";
import {DefaultTextConvert} from "./default-text-convert";
import {GlobalMdArgs} from "../common/global-md-args";
import {Logger} from "../common/logger";


interface ITextHandler {
    setMdToHtmlHandler: (handler: IFTextHandler) => void;
    setHtmlToMdHandler: (handler: IFTextHandler) => void;

    register(editor: Editor): void;

    convertHtmlToMd(htmlText: string): string
    convertMdToHtml(mdText: string): string
    textChanged(mdText: string, htmlText: string): boolean
}

export class TextHandler implements ITextHandler {
    static shared = new TextHandler()

    protected mdToHtmlHandler?: IFTextHandler
    protected htmlToMdHandler?: IFTextHandler

    convertHtmlToMd = (htmlText: string): string => {
        Logger.debug("htmlText: ", htmlText)
        if (this.htmlToMdHandler) {
            return this.htmlToMdHandler(htmlText)
        }
        return htmlText
    }

    convertMdToHtml = (mdText: string): string => {
        if (this.mdToHtmlHandler) {
            return this.mdToHtmlHandler(mdText)
        }
        return mdText
    }

    textChanged(mdText: string, htmlText: string): boolean{
        const _convertMdText = this.convertHtmlToMd(htmlText)
        if (_convertMdText !== mdText) {
            return true
        }

        return false
    }

    constructor() {
        this.doInit().then()
    }
    protected async doInit(){
        this.setHtmlToMdHandler(DefaultTextConvert.shared.convertHtmlToMd)
        this.setMdToHtmlHandler(DefaultTextConvert.shared.convertMdToHtml)
    }

    setHtmlToMdHandler(handler: (text: string) => string): void {
        this.htmlToMdHandler = handler
    }

    setMdToHtmlHandler(handler: (text: string) => string): void {
        this.mdToHtmlHandler = handler
    }

    register(editor: Editor): void {
        const options: CodeMdOptions | undefined = GlobalMdArgs.shared.mdOptions

        if (options?.mdToHtml) {
            this.setMdToHtmlHandler(options.mdToHtml)
        }
        if (options?.htmlToMd){
            this.setHtmlToMdHandler(options.htmlToMd)
        }
    }
}




