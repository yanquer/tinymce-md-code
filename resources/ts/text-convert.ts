// @ts-ignore
import markdownit from 'markdown-it'
// import TurndownService from 'turndown/lib/turndown.browser.umd'
// @ts-ignore
import TurndownService from 'turndown'


export class TextConvert {
    static shared = new TextConvert()

    protected mdRender = markdownit()
    // 将html还原为markdown源码
    protected turndownService = new TurndownService()
    convertHtmlToMd = (htmlText: string): string => {
        if (htmlText) {
            return this.turndownService.turndown(htmlText)
        }
        return htmlText
    }

    convertMdToHtml = (mdText: string): string => {
        if (mdText) return this.mdRender.render(mdText)
        return mdText
    }

}


