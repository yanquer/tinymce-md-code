

此插件功能

- 支持使用 `tinymce` 时, 进行markdown源码编辑


## 使用

将生成的 `plugin.min.js` 复制到 `插件目录` 

![插件目录](resources/img/img.png)

在自己的项目安装以下模块

```bash
yarn add turndown markdown-it  --save
```

再将 [!转换器](resources/ts/text-convert.ts) 拷贝到自己的项目,
这是为了实现markdow与html的互相转换.

为什么不直接写到插件内部? 抱歉, 插件是前端库, 编译的require是node才能用的,
全部弄到插件代码里, 可能会跟外部库有重复,
稳一手, 需要导库的自行实现

最后上代码(React版本)

```typescript jsx
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {TextConvert} from "./text-convert.ts";


const TinyEditor = () => {
    const editorRef = useRef<Editor | null>(null);
    const log = () => {
        if (editorRef.current) {
            // @ts-expect-error has getContent
            console.log(editorRef.current?.getContent());
        }
    };
    return (
        <>
            <Editor
                tinymceScriptSrc='/tinymce/tinymce.min.js'
                licenseKey='gpl'
                // @ts-expect-error office-use
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue='<p>This is the initial content of the editor.</p>'
                init={{
                    skin: "oxide-dark",
                    content_css: ["dark"],
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview',
                        // 'help',
                        'wordcount',
                        'codemd',
                        'supercode',
                    ],
                    toolbar: 'undo redo codemd supercode code  | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat ',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    codemd: {
                        htmlToMd: (text: string) => TextConvert.shared.convertHtmlToMd(text),
                        mdToHtml: (text: string) => TextConvert.shared.convertMdToHtml(text),
                    }
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}


export default TinyEditor

```










