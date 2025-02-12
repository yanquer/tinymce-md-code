import {Editor} from 'tinymce';

import {CodeMD} from "../common";


const register = (editor: Editor): void => {

  const onAction = () => editor.execCommand(CodeMD.CMD_ID);

  editor.ui.registry.addButton(CodeMD.ID, {
    icon: 'sourcecode',
    tooltip: 'Source Code',
    onAction,
    // onSetup: (buttonApi) => {
    //   const editorEventCallback = (eventApi) => {
    //     buttonApi.setEnabled(true)
    //     // buttonApi.setEnabled(eventApi.element.nodeName.toLowerCase() !== 'time');
    //   };
    //   editor.on('NodeChange', editorEventCallback);
    //   return () => editor.off('NodeChange', editorEventCallback);
    // },
  });

  editor.ui.registry.addMenuItem(CodeMD.ID, {
    icon: 'sourcecode',
    text: 'Source Code',
    onAction,
  });
};


const _setOtherButtonEnabled7 = (editor: Editor, isEnabled: boolean = false): boolean => {
  // const allButtons = editor.ui.registry.getAll().buttons;
  // const allButtonsName: string[] = []
  // for (const buttonId in allButtons) {
  //   allButtonsName.push(buttonId);
  // }

  // const toolButtons = editor.editorContainer.querySelectorAll('.tox-tbtn')
  // tinymce 7.x 版本
  const toolButtons = editor.editorContainer.querySelectorAll('[data-mce-name]')

  const len_ = toolButtons.length;
  for (let i = 0; i < len_; i++) {
    const toolButton = toolButtons[i] as HTMLElement;
    const btnName = toolButton.dataset.mceName
    if (btnName !== CodeMD.ID && btnName
        // && allButtonsName.includes(btnName)
    ) {
      if (isEnabled) {
        toolButton.classList.remove('tox-tbtn--disabled')
        toolButton.style.pointerEvents = 'auto'
      } else {
        toolButton.classList.add('tox-tbtn--disabled');
        toolButton.style.pointerEvents = 'none'
      }
    }
  }

  return len_ > 0
}
const _setOtherButtonEnabled6 = (editor: Editor, isEnabled: boolean = false): boolean => {

  // tinymce 6.x 版本
  const lowToolButtons =
      editor.editorContainer.
      querySelectorAll('.tox-editor-header > .tox-toolbar-overlord > .tox-toolbar__primary button')

  const len_ = lowToolButtons.length;
  for (let i = 0; i < len_; i++) {
    const toolButton = lowToolButtons[i] as HTMLElement;
    const btnName: string = toolButton.ariaLabel
    if (
        // @ts-ignore
        (![CodeMD.ID, CodeMD.TITLE_ZH].includes(btnName))
        && btnName
        // && allButtonsName.includes(btnName)
    ) {
      if (isEnabled) {
        toolButton.classList.remove('tox-tbtn--disabled')
        toolButton.style.pointerEvents = 'auto'
      } else {
        toolButton.classList.add('tox-tbtn--disabled');
        toolButton.style.pointerEvents = 'none'
      }
    }
  }

  return len_ > 0
}

const setOtherButtonEnabled = (editor: Editor, isEnabled: boolean = false): void => {
  if (_setOtherButtonEnabled7(editor, isEnabled)) {
    return
  }
  _setOtherButtonEnabled6(editor, isEnabled);

}


export {
  register,
  setOtherButtonEnabled,
};
