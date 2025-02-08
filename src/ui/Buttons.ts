import {Editor} from 'tinymce';

import {CodeMD} from "../common";


const register = (editor: Editor): void => {

  const onAction = () => editor.execCommand(CodeMD.CMD_ID);

  editor.ui.registry.addButton(CodeMD.ID, {
    icon: 'sourcecode',
    tooltip: 'Source CodeMd',
    onAction
  });

  editor.ui.registry.addMenuItem(CodeMD.ID, {
    icon: 'sourcecode',
    text: 'Source CodeMd',
    onAction
  });
};

export {
  register
};
