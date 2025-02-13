import {Editor} from "tinymce";
import {TextHandler} from "../third/text-handler";
import * as Content from './Content';
import {Logger} from "../common/logger";
import {MdTextEditor} from "../ui/md-text-editor";

enum ETextType{
    markdown = 'markdown',
    html = 'html',
}

export class EditorTextManager{
    static shared = new EditorTextManager();

    // 默认 html
    protected curTextType: ETextType = ETextType.html;
    public doInit(){
        this.curTextType = ETextType.html;
    }

    editorConvertText(editor: Editor, text?: string) {
        if (!editor) return

        const htmlText = text ?? Content.getContent(editor)

        switch (this.curTextType) {
            case ETextType.markdown:
                const mdText = text ?? MdTextEditor.shared.mdText
                const html_ = TextHandler.shared.convertMdToHtml(mdText);
                Logger.debug("editorConvertText-html_: ", html_)
                MdTextEditor.shared.close(editor)
                if (TextHandler.shared.textChanged(mdText, htmlText)) {
                    Content.setContent(editor, html_);
                }
                this.curTextType = ETextType.html;
                break;
            case ETextType.html:
                const md_ = TextHandler.shared.convertHtmlToMd(htmlText);
                Logger.debug("editorConvertText-md_: ", md_)
                // Content.setContent(editor, md_);
                MdTextEditor.shared.open(editor, md_)
                this.curTextType = ETextType.markdown;
                break;
            default:
                // throw Error
                return;
        }
    }
}



