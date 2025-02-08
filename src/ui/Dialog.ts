import {Editor} from 'tinymce';

import * as Content from '../core/Content';
import {TextHandler} from "../third/text-handler";


const open = (editor: Editor): void => {
  const editorContent = Content.getContent(editor);

  editor.windowManager.open({
    title: 'Source CodeMd',
    size: 'large',
    body: {
      type: 'panel',
      items: [
        {
          type: 'textarea',
          name: 'codeMd'
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
      codeMd: editorContent
    },
    onSubmit: (api: any) => {
      const curText: {codeMd: string} = api.getData()
      const html_ = TextHandler.shared.convertMdToHtml(curText.codeMd)
      Content.setContent(editor, html_);
      api.close();
    }
  });
};

export {
  open
};
