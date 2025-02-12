import {Editor} from 'tinymce';
import {TextType} from "../common";
import {TextHandler} from "../third/text-handler";


const setContent = (editor: Editor, html: string): void => {
  // We get a lovely "Wrong document" error in IE 11 if we
  // don't move the focus to the editor before creating an undo
  // transaction since it tries to make a bookmark for the current selection
  editor.focus();

  editor.undoManager.transact(() => {
    editor.setContent(html);
  });

  editor.selection.setCursorLocation();
  editor.nodeChanged();
};

// editor 缓存
let editorRef: Editor | undefined = undefined
const getContent = (editor: Editor, textType: TextType=TextType.RAW): string => {
  editorRef = editor
  const htmlText = editor.getContent({ source_view: true});

  // return TextHandler.shared.convertHtmlToMd(htmlText);
  return htmlText
};
const getCacheEditorContent = (editor?: Editor, textType: TextType=TextType.RAW): string => {

  return editorRef?.getContent({ source_view: true}) ?? ""

};

export {
  setContent,
  getContent,
  getCacheEditorContent,
};
