import {Editor} from "tinymce";
import {CodeMD, CodeMdOptions, IFTextHandler} from "../common";


interface ITextHandler {
    setMdToHtmlHandler: (handler: IFTextHandler) => void;
    setHtmlToMdHandler: (handler: IFTextHandler) => void;

    register(editor: Editor): void;
}

export class TextHandler implements ITextHandler {
    static shared = new TextHandler()

    protected mdToHtmlHandler?: IFTextHandler
    protected htmlToMdHandler?: IFTextHandler

    convertHtmlToMd = (htmlText: string): string => {
        console.log("htmlText: ", htmlText)
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

    setHtmlToMdHandler(handler: (text: string) => string): void {
        this.htmlToMdHandler = handler
    }

    setMdToHtmlHandler(handler: (text: string) => string): void {
        this.mdToHtmlHandler = handler
    }

    register(editor: Editor): void {
        const options: CodeMdOptions | undefined = editor.getParam(CodeMD.ID)

        if (options?.mdToHtml) {
            this.mdToHtmlHandler = options.mdToHtml
        }
        if (options?.htmlToMd){
            this.htmlToMdHandler = options.htmlToMd
        }
    }
}




