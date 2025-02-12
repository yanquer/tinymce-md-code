/// form
///   https://cdn.tiny.cloud/1/1x3lwqiqrkkxnajgkmav39c3fqslmlje581sa9e870b3a4tw/tinymce/7.6.1-131/plugins/markdown/plugin.min.js
/// 此 ts 由 AI 生成 后部分修改

/*!
 * Tiny Markdown plugin
 *
 * Copyright (c) 2024 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.6.1-131
 */

// markdown-plugin.ts
import { Marked, marked } from 'marked';
import TurndownService from 'turndown';
import { Plugin } from 'tinymce';

interface MarkdownSymbols {
    [key: string]: string;
}

interface MarkdownPluginOptions {
    markdown_symbols?: MarkdownSymbols;
}

interface ConverterSet {
    converterToHtml: Marked;
    converterFromHtml: TurndownService;
}

const escapeRegExp = (str: string): string =>
    str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

const createSymbolsExtension = (symbols: MarkdownSymbols, options: {
    startMarker?: string;
    endMarker?: string;
    nameAddition?: string;
}) => {
    const symbolNames = Object.keys(symbols);
    if (symbolNames.length === 0) return null;

    const extensionName = `TinyPlugin${options.nameAddition || ''}`;
    const pattern = new RegExp(
        `${options.startMarker || ':'}(${symbolNames.map(escapeRegExp).join('|')})${options.endMarker || ':'}`
    );

    return {
        extensions: [{
            name: extensionName,
            level: 'inline' as const,
            start: (src: string) => src.match(pattern)?.index,
            tokenizer: (src: string) => {
                const match = pattern.exec(src);
                if (!match) return;

                const symbolKey = match[1];
                return {
                    type: extensionName,
                    raw: match[0],
                    text: symbols[symbolKey]
                };
            },
            renderer: (token: { text: string }) => token.text
        }]
    };
};

const createEmojiExtension = async (editor: any): Promise<any> => {
    if (!editor.plugins.emoticons) return null;

    try {
        const emojis = await editor.plugins.emoticons.getAllEmojis();
        const emojiMap: { [key: string]: string } = {};

        Object.values(emojis).forEach((emoji: any) => {
            emojiMap[emoji.title] = emoji.char;
        });

        return createSymbolsExtension(emojiMap, {
            nameAddition: '-emoji',
            startMarker: ':',
            endMarker: ':'
        });
    } catch (error) {
        console.error('Error loading emojis:', error);
        return null;
    }
};

const setupConverters = (editor: any, symbols: MarkdownSymbols): Promise<ConverterSet> => {
    const markdownParser = new Marked();
    const htmlParser = new TurndownService();

    // Configure Marked.js
    markdownParser.use({
        renderer: {
            code: ({text, lang, escaped}) => {
                return lang
                    ? `<pre class="language-${lang}"><code>${text}</code></pre>`
                    : text;
            }
        }
    });

    // Add custom symbols
    const symbolsExtension = createSymbolsExtension(symbols, {
        startMarker: '\\(',
        endMarker: '\\)',
        nameAddition: '-symbols'
    });

    if (symbolsExtension) {
        markdownParser.use(symbolsExtension);
    }

    // Add emoji support
    return createEmojiExtension(editor)
        .then(emojiExtension => {
            if (emojiExtension) {
                markdownParser.use(emojiExtension);
            }
            return {
                converterToHtml: markdownParser,
                converterFromHtml: htmlParser
            };
        })
        .catch(error => {
            console.error('Error initializing converters:', error);
            return {
                converterToHtml: markdownParser,
                converterFromHtml: htmlParser
            };
        });
};

const MarkdownPlugin: Plugin = (editor) => {
    editor.options.register('markdown_symbols', {
        processor: 'object',
        default: {
            C: '©',
            TM: '™',
            R: '®'
        }
    });

    const symbols = editor.options.get('markdown_symbols') as MarkdownSymbols;
    const convertersPromise = setupConverters(editor, symbols);

    // Add Markdown insert command
    editor.addCommand('MarkdownInsert', (ui: boolean, content: string) => {
        if (!content) return;

        convertersPromise.then(({ converterToHtml }) => {
            editor.undoManager.transact(() => {
                editor.insertContent(converterToHtml.parse(content));
            });
            editor.fire('MarkdownInserted');
        });
    });

    // Handle paste events
    editor.on('paste', (e: any) => {
        if (e.isDefaultPrevented() || editor.queryCommandState('mceTogglePlainTextPaste')) return;

        const clipboardData = e.clipboardData;
        if (!clipboardData || clipboardData.types.includes('text/html')) return;

        const text = clipboardData.getData('text/plain');
        if (!text) return;

        convertersPromise.then(({ converterToHtml }) => {
            const html = converterToHtml.parse(text);
            if (html === text) return; // No conversion needed

            e.preventDefault();
            editor.execCommand('MarkdownInsert', false, text);
            editor.fire('MarkdownPasted');
        });
    });

    // Add getMarkdownContent API
    editor.getMarkdownContent = (): Promise<string> => {
        return convertersPromise.then(({ converterFromHtml }) =>
            converterFromHtml.turndown(editor.getContent())
        );
    };
};

export default MarkdownPlugin;
