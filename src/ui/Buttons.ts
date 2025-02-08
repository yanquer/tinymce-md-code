// import {Editor} from 'tinymce';

type Editor = any

const register = (editor: Editor): void => {

  const onAction = () => editor.execCommand('mceCodeEditor');

  editor.ui.registry.addButton('codemd', {
    icon: 'sourcecode',
    tooltip: 'Source codemd',
    onAction
  });

  editor.ui.registry.addMenuItem('codemd', {
    icon: 'sourcecode',
    text: 'Source codemd',
    onAction
  });
};

export {
  register
};
