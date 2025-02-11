import {Editor} from 'tinymce';

import * as Dialog from '../ui/Dialog';
import {CodeMD} from "../common";
import {EditorTextManager} from "../core/editor-text-manager";


const register = (editor: Editor): void => {
  editor.addCommand(CodeMD.CMD_ID, () => {
    // Dialog.open(editor);
    EditorTextManager.shared.editorConvertText(editor, undefined)
  });
};

export {
  register
};
