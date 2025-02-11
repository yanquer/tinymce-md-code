// import markdownit from 'markdown-it'
// import TurndownService from 'turndown/lib/turndown.browser.umd'
import TurndownService from 'turndown'
import {marked} from 'marked'


export class DefaultTextConvert {
    static shared = new DefaultTextConvert()

    // protected mdRender = markdownit()
    protected mdRender = marked
    // 将html还原为markdown源码
    protected turndownService = new TurndownService()
    convertHtmlToMd = (htmlText: string): string => {
        if (htmlText) {
            return this.turndownService.turndown(htmlText)
        }
    }

    convertMdToHtml = (mdText: string): string => {
        // return this.mdRender.render(mdText)
        return this.mdRender.parse(mdText) as string
    }

}


