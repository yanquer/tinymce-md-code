import {Editor} from 'tinymce';

import {CodeMD, CodeMdOptions, delayExec} from "../common/common";
import {MdTextEditor} from "./md-text-editor";


export class ButtonsUtil{
  static shared = new ButtonsUtil()

  // 禁用前状态缓存
  protected _buttonEnableState7?: {[key: string]: boolean} = undefined
  protected _setOtherButtonEnabled7 = (editor: Editor, isEnabled: boolean = false): boolean => {
    // const allButtons = editor.ui.registry.getAll().buttons;
    // const allButtonsName: string[] = []
    // for (const buttonId in allButtons) {
    //   allButtonsName.push(buttonId);
    // }

    // const toolButtons = editor.editorContainer.querySelectorAll('.tox-tbtn')
    // tinymce 7.x 版本
    const toolButtons = editor.editorContainer.querySelectorAll('[data-mce-name]')

    if (!this._buttonEnableState7){
      this._buttonEnableState7 = {}
    }
    const len_ = toolButtons.length;
    for (let i = 0; i < len_; i++) {
      const toolButton = toolButtons[i] as HTMLElement;
      const btnName = toolButton.dataset.mceName
      if (btnName !== CodeMD.ID && btnName
          // && allButtonsName.includes(btnName)
      ) {
        if (isEnabled) {
          if (this._buttonEnableState7?.[btnName] ?? true){
            toolButton.classList.remove(ButtonsUtil.disableClass)
          }
          toolButton.style.pointerEvents = 'auto'
        } else {
          this._buttonEnableState7[btnName] = !toolButton.classList.contains(ButtonsUtil.disableClass)
          toolButton.classList.add(ButtonsUtil.disableClass);
          toolButton.style.pointerEvents = 'none'
        }
      }
    }

    if (isEnabled) {
      this._buttonEnableState7 = undefined
    }
    MdTextEditor.shared.focus(editor)
    return len_ > 0
  }

  // 禁用前状态缓存
  protected _buttonEnableState6?: {[key: string]: boolean} = undefined
  protected _setOtherButtonEnabled6 = (editor: Editor, isEnabled: boolean = false): boolean => {

    // tinymce 6.x 版本
    const lowToolButtons =
        editor.editorContainer.
        querySelectorAll('.tox-editor-header > .tox-toolbar-overlord > .tox-toolbar__primary button')

    if (!this._buttonEnableState6){
      this._buttonEnableState6 = {}
    }
    const len_ = lowToolButtons.length;
    for (let i = 0; i < len_; i++) {
      const toolButton = lowToolButtons[i] as HTMLElement;
      const btnName: string = toolButton.ariaLabel
      if (
          // @ts-ignore
          (![CodeMD.ID, CodeMD.TITLE_ZH, CodeMD.TITLE].includes(btnName))
          && btnName
          // && allButtonsName.includes(btnName)
      ) {
        if (isEnabled) {
          if (this._buttonEnableState6?.[btnName] ?? true){
            toolButton.classList.remove(ButtonsUtil.disableClass)
          }
          toolButton.style.pointerEvents = 'auto'
        } else {
          this._buttonEnableState6[btnName] = !toolButton.classList.contains(ButtonsUtil.disableClass)
          toolButton.classList.add(ButtonsUtil.disableClass);
          toolButton.style.pointerEvents = 'none'
        }
      }
    }

    if (isEnabled){
      this._buttonEnableState6 = undefined
    }

    MdTextEditor.shared.focus(editor)
    return len_ > 0
  }

  protected _setOtherButtonEnabled = (editor: Editor, isEnabled: boolean = false): void => {
    if (this._setOtherButtonEnabled7(editor, isEnabled)) {
      return
    }
    this._setOtherButtonEnabled6(editor, isEnabled);

  }

  setOtherButtonEnabled = (editor: Editor, isEnabled: boolean = false): void => {
    // 延迟执行, 避免状态被tinymce其它策略回滚
    delayExec(() => {
      this._setOtherButtonEnabled(editor, isEnabled);
    }, isEnabled ? 0 : 100)
  }

  register = (editor: Editor): void => {

    const onAction = () => {
      editor.execCommand(CodeMD.CMD_ID);

      // todo: 切换 tooltip 显示
      // const btn = editor.ui.registry.getAll().buttons[CodeMD.ID]
      // btn.tooltip = CodeMD.TITLE_RESET as string
      // setTooltip('New Tooltip');
    }

    editor.ui.registry.addButton(CodeMD.ID, {
      icon: 'sourcecode',
      tooltip: CodeMD.TITLE as string,
      onAction,
      // onSetup: (buttonApi) => {
      //   const editorEventCallback = (eventApi) => {
      //     const mdOptions: CodeMdOptions | undefined = editor.getParam(CodeMD.ID)
      //     const langId = editor.getParam('language')
      //     buttonApi.setText(
      //         MdTextEditor.shared.mdTextOpen ?
      //             CodeMD.TITLE :
      //             CodeMD.TITLE_RESET
      //     )
      //     // buttonApi.setEnabled(eventApi.element.nodeName.toLowerCase() !== 'time');
      //   };
      //   editor.on('NodeChange', editorEventCallback);
      //   return () => editor.off('NodeChange', editorEventCallback);
      // },
    });

    editor.ui.registry.addMenuItem(CodeMD.ID, {
      icon: 'sourcecode',
      text: CodeMD.TITLE as string,
      onAction,
    });
  };

}

export namespace ButtonsUtil {
  export const disableClass = "tox-tbtn--disabled"
}

