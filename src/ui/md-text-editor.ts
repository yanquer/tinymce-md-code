import {Editor} from "tinymce";

import * as Content from '../core/Content';
import {getCacheEditorContent} from "../core/Content";
import {TextHandler} from "../third/text-handler";

export class MdTextEditor {
    static shared = new MdTextEditor();

    open(editor: Editor, mdText: string){
        this.mdString = mdText;
        this.addMdEditor(editor)
    }

    close(editor: Editor){
        this.removeMdEditor(editor)
    }

    protected mdId = 'md-text-editor';
    protected mdString = ""
    get mdText() {
        return this.textArea?.value ?? this.mdString;
    }

    protected textArea?: HTMLTextAreaElement;
    protected iframe?: HTMLIFrameElement;
    protected mdBodyMouserEnterEvent(){
        if (this.iframe){
            const iframeBody = this.iframe.contentDocument.body as HTMLBodyElement;
            iframeBody.contentEditable = 'false'
        }
    }
    protected mdBodyMouserLeaveEvent(){
        if (this.iframe){
            const iframeBody = this.iframe.contentDocument.body as HTMLBodyElement;
            iframeBody.contentEditable = 'true'
        }
    }
    protected mdBodyAddEvent(bodyMd: HTMLBodyElement){
        bodyMd.addEventListener('mouseenter', (e) => this.mdBodyMouserEnterEvent() )
        bodyMd.addEventListener('mouseleave', (e) => this.mdBodyMouserLeaveEvent() )
    }
    protected mdBodyRmEvent(bodyMd: HTMLBodyElement){
        bodyMd.removeEventListener('mouseenter', (e) => this.mdBodyMouserEnterEvent() )
        bodyMd.removeEventListener('mouseleave', (e) => this.mdBodyMouserLeaveEvent() )
    }

    protected htmlChange(htmlBody: HTMLBodyElement){

        const setTextAreaText = (text: string) => {
            if (this.textArea){
                this.textArea.textContent = text
            }
        }

        const observer = new MutationObserver((mutationsList, observer) => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                    setTextAreaText(TextHandler.shared.convertHtmlToMd(Content.getCacheEditorContent()))
                } else if (mutation.type === 'attributes') {
                    console.log(`The ${mutation.attributeName} attribute was modified.`);
                    setTextAreaText(TextHandler.shared.convertHtmlToMd(Content.getCacheEditorContent()))
                }
            });
        });

        const config = {
            attributes: true,
            childList: true,
            subtree: true,
            attributeOldValue: true
        };

        observer.observe(htmlBody, config);
        return () => {observer.disconnect();};
    }
    protected htmlRmEvent?: () => void
    protected htmlBodyAddEvent(htmlBody: HTMLBodyElement){
        this.htmlRmEvent = this.htmlChange(htmlBody);
    }
    protected htmlBodyRmEvent(htmlBody: HTMLBodyElement){
        this.htmlRmEvent?.()
    }

    protected getMdBody(iframeDoc: Document) {
        // body
        const iframeBody = iframeDoc.body as HTMLBodyElement;
        // iframeBody.contentEditable = "false"
        iframeBody.style.overflow = "hidden";
        // this.scrollToTop(iframeBody)

        const iframeBodyCpStyle = window.getComputedStyle(iframeBody);
        const bgColor = iframeBodyCpStyle.backgroundColor;
        const fontColor = iframeBodyCpStyle.color;
        const fontFamily = iframeBodyCpStyle.fontFamily;
        const fontSize = iframeBodyCpStyle.fontSize;

        const iframeHtml = iframeDoc.getElementsByTagName('html')[0];
        const bodyMd = iframeDoc.createElement('body');
        bodyMd.style.position = 'absolute';
        bodyMd.style.top = '0';
        bodyMd.style.height = '100%';
        bodyMd.style.width = '100%';
        bodyMd.style.margin = '0';
        bodyMd.style.overflow = 'hidden';
        bodyMd.style.backgroundColor = bgColor;
        bodyMd.style.color = fontColor;
        bodyMd.style.fontFamily = fontFamily
        this.mdBodyAddEvent(bodyMd)
        // 监听原来 body 的变化, 实时刷新 bodyMd
        this.htmlBodyAddEvent(iframeBody)
        iframeHtml.append(bodyMd)

        const textArea = iframeDoc.createElement("textarea")
        // textArea.style.position = "absolute"
        textArea.style.height = "calc(100% - 2rem)"
        textArea.style.width = "calc(100% - 2rem)"
        textArea.id = this.mdId
        textArea.textContent = this.mdString;
        textArea.style.backgroundColor = bgColor;
        textArea.style.fontFamily = fontFamily
        textArea.style.color = fontColor;
        textArea.style.padding = "1rem";
        textArea.style.border = "none";
        textArea.style.fontSize = fontSize;
        textArea.style.resize = "none";
        // 去掉激活时外部轮廓线
        textArea.style.outline = "none";
        // textArea.text = (ev) => {
        //     const textVal = textArea.textContent
        //     this.mdString = textVal;
        // }
        this.textArea = textArea
        bodyMd.append(textArea)
    }
    protected addMdEditor(editor: Editor){
        const iframe = editor.iframeElement
        this.iframe = iframe
        // iframe - document
        const iframeDoc = iframe.contentDocument;
        this.scrollToWinTop(iframe.contentWindow)
        this.getMdBody(iframeDoc)
    }

    // <body id="tinymce"
    // class="mce-content-body "
    // data-id="tiny-react_94105848521739258707854"
    // aria-label="Rich Text Area. Press ALT-0 for help."
    // contenteditable="true" spellcheck="false"><p>This is the initial content of the editor.</p></body>

    protected removeMdEditor(editor: Editor){
        const iframe = editor.iframeElement
        // iframe - document
        const iframeDoc = iframe.contentDocument;
        const iframeBody = iframe.contentDocument.body as HTMLBodyElement;
        // iframeBody.contentEditable = "true"
        iframeBody.style.overflow = "auto";
        const iframeHtml = iframeDoc.getElementsByTagName('html')[0];
        const body = iframeDoc.getElementsByTagName("body");
        const mdBody = body[body.length - 1]
        // this.scrollToTop(mdBody)
        this.scrollToWinTop(iframe.contentWindow)
        this.mdBodyRmEvent(mdBody)
        this.htmlBodyRmEvent(iframeBody)
        iframeHtml.removeChild(mdBody);
    }

    protected scrollToTop(element: HTMLElement){
        // 切换时先滚动到顶部, 避免位置不对
        element.scrollIntoView({block: "start"});
    }
    protected scrollToWinTop(win: Window){
        // 切换时先滚动到顶部, 避免位置不对
        // element.scrollIntoView({block: "start"});
        win.scrollTo(0, 0)
    }
}



