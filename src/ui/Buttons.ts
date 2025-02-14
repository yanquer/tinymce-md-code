import {Editor} from 'tinymce';

import {CodeMD, CodeMdOptions, delayExec} from "../common/common";
import {MdTextEditor} from "./md-text-editor";


export class ButtonsUtil{
  static shared = new ButtonsUtil()

  protected setButtonEnabled(toolButton: HTMLElement){
    // const isEnabled = true
    toolButton.classList.remove(ButtonsUtil.disableClass)
    toolButton.removeAttribute('disabled')
    // toolButton.style.pointerEvents = 'auto'
  }
  protected setButtonDisabled(toolButton: HTMLElement){
    // const isEnabled = false
    toolButton.classList.add(ButtonsUtil.disableClass);
    // toolButton.style.pointerEvents = 'none'
    toolButton.setAttribute('disabled', 'disabled')
  }

  protected getAllButton7 = (editor: Editor) => {
    // const allButtons = editor.ui.registry.getAll().buttons;
    // const allButtonsName: string[] = []
    // for (const buttonId in allButtons) {
    //   allButtonsName.push(buttonId);
    // }

    // const toolButtons = editor.editorContainer.querySelectorAll('.tox-tbtn')
    // tinymce 7.x 版本
    const toolButtons = editor.editorContainer.querySelectorAll('[data-mce-name]')

    return toolButtons
  }
  protected _isNotCodeMdBtn7(toolButton: HTMLElement){
    const btnName = toolButton.dataset.mceName
    return [
        !!(btnName !== CodeMD.ID && btnName
        // && allButtonsName.includes(btnName)
        )
      , btnName
    ]
  }

  protected getAllButton6 = (editor: Editor) => {

    // tinymce 6.x 版本
    const lowToolButtons =
        editor.editorContainer.
        querySelectorAll('.tox-editor-header > .tox-toolbar-overlord > .tox-toolbar__primary button')

    return lowToolButtons
  }
  protected _isNotCodeMdBtn6(toolButton: HTMLElement){
    const btnName: string = toolButton.ariaLabel

    return [
        // @ts-ignore
        !!((![CodeMD.ID, CodeMD.TITLE_ZH, CodeMD.TITLE].includes(btnName)) && btnName
        // && allButtonsName.includes(btnName)
        ),
        btnName
    ]
  }

  // 禁用前状态缓存
  protected _buttonEnableState?: {[key: string]: boolean} = undefined
  protected _setOtherButtonEnabled = (editor: Editor, isEnabled: boolean = false): void => {

    // const allButtons = editor.ui.registry.getAll().buttons;
    // const allButtonsName: string[] = []
    // for (const buttonId in allButtons) {
    //   allButtonsName.push(buttonId);
    // }

    // const toolButtons = editor.editorContainer.querySelectorAll('.tox-tbtn')
    // tinymce 7.x 版本
    // const toolButtons = editor.editorContainer.querySelectorAll('[data-mce-name]')
    const toolButtons7 = this.getAllButton7(editor)
    const toolButtons6 = this.getAllButton6(editor)
    const isTinymce7 = toolButtons7.length > 0
    const toolButtons = isTinymce7 ? toolButtons7 : toolButtons6
    // 返回 [是否是当前按钮, 按钮名]
    const isCodeMdBthFun = isTinymce7 ? this._isNotCodeMdBtn7 : this._isNotCodeMdBtn6

    if (!this._buttonEnableState){
      this._buttonEnableState = {}
    }
    const len_ = toolButtons.length;
    for (let i = 0; i < len_; i++) {
      const toolButton = toolButtons[i] as HTMLElement;
      const [isCodeMdBth, btnName] = isCodeMdBthFun(toolButton)
      if (isCodeMdBth) {
        if (isEnabled) {
          if (this._buttonEnableState?.[btnName as string] ?? true){
            this.setButtonEnabled(toolButton)
          }
        } else {
          this._buttonEnableState[btnName as string] = !toolButton.classList.contains(ButtonsUtil.disableClass)
          this.setButtonDisabled(toolButton)
        }
      }
    }

    if (isEnabled) {
      this._buttonEnableState = undefined
    }
    MdTextEditor.shared.focus(editor)

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

    const svgIcon = "mdPreview"
    // 注册SVG图标
    editor.ui.registry.addIcon(
        svgIcon,
        // https://fontawesome.com/icons/square-pen?f=classic&s=solid
        // '<svg width="24" height="24" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM325.8 139.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-21.4 21.4-71-71 21.4-21.4c15.6-15.6 40.9-15.6 56.6 0zM119.9 289L225.1 183.8l71 71L190.9 359.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"/></svg>'
        // https://fontawesome.com/icons/pen?f=classic&s=solid
        '<svg width="16" height="16" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>',
    )

    editor.ui.registry.addButton(CodeMD.ID, {
      icon: svgIcon,
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
      icon: svgIcon,
      text: CodeMD.TITLE as string,
      onAction,
    });
  };

}

export namespace ButtonsUtil {
  export const disableClass = "tox-tbtn--disabled"
}

