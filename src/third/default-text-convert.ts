// import markdownit from 'markdown-it'
// import TurndownService from 'turndown/lib/turndown.browser.umd'
import TurndownService from 'turndown'
import {marked} from 'marked'


export class DefaultTextConvert {
    static shared = new DefaultTextConvert()

    // protected mdRender = markdownit()
    protected mdRender = marked
    // 将html还原为markdown源码
    // protected turndownService = new TurndownService()
    protected turndownService: any = undefined
    protected doInitTurnDown(){
        this.turndownService = new TurndownService({
            // 代码块使用 反引号 环绕
            codeBlockStyle: "fenced",
            fence: "```",
            // 标题使用前置 #
            headingStyle: "atx",
        })
        // 保留代码块之间的换行
        this.turndownService.addRule('codeBlock', {
            filter: 'pre',
            replacement: (content: string) => {
                // 确保代码块中的换行符被保留
                return '```\n' + content.trim() + '\n```';
            }
        });
    }
    convertHtmlToMd = (htmlText: string): string => {
        if (!this.turndownService){
            this.doInitTurnDown()
        }
        if (htmlText) {
            return this.turndownService.turndown(htmlText)
        }
    }

    convertMdToHtml = (mdText: string): string => {
        // return this.mdRender.render(mdText)
        return this.mdRender.parse(mdText) as string
    }

}


