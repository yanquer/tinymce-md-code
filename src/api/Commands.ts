import {Editor} from 'tinymce';

import * as Dialog from '../ui/Dialog';
import {CodeMD} from "../common";


const register = (editor: Editor): void => {
  editor.addCommand(CodeMD.CMD_ID, () => {
    Dialog.open(editor);
  });
};

export {
  register
};
