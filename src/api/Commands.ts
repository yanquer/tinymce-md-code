// import {Editor} from 'tinymce';

import * as Dialog from '../ui/Dialog';

type Editor = any

const register = (editor: Editor): void => {
  editor.addCommand('mceCodeEditor2', () => {
    Dialog.open(editor);
  });
};

export {
  register
};
