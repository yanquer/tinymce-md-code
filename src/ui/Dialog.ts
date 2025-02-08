// import {Editor} from 'tinymce';

import * as Content from '../core/Content';

type Editor = any

const open = (editor: Editor): void => {
  const editorContent = Content.getContent(editor);

  editor.windowManager.open({
    title: 'Source Codemd',
    size: 'large',
    body: {
      type: 'panel',
      items: [
        {
          type: 'textarea',
          name: 'codemd'
        }
      ]
    },
    buttons: [
      {
        type: 'cancel',
        name: 'cancel',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'save',
        text: 'Save',
        primary: true
      }
    ],
    initialData: {
      code: editorContent
    },
    onSubmit: (api: any) => {
      Content.setContent(editor, api.getData().code);
      api.close();
    }
  });
};

export {
  open
};
