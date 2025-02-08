// import markdownit from 'markdown-it'
// // import TurndownService from 'turndown/lib/turndown.browser.umd'
// import TurndownService from 'turndown'
//
//
// export class TextConvert {
//     static shared = new TextConvert()
//
//     protected mdRender = markdownit()
//     // 将html还原为markdown源码
//     protected turndownService = new TurndownService()
//     convertHtmlToMd = (htmlText: string): string => {
//         console.log("htmlText: ", htmlText)
//         if (htmlText) {
//             return this.turndownService.turndown(htmlText)
//         }
//         return ""
//     }
//
//     convertMdToHtml = (mdText: string): string => {
//         return this.mdRender.render(mdText)
//     }
//
// }
//
//
