import {Editor} from 'tinymce';

// import * as Dialog from '../ui/Dialog';
import {CodeMD} from "../common/common";
import {EditorTextManager} from "../core/editor-text-manager";
import {throttle} from "../common/throttle";


const register = (editor: Editor): void => {
  // 单例 避免关闭后打开缓存影响
  EditorTextManager.shared.doInit();

  // 节流, 避免太快调用导致按钮状态渲染出问题
  const throttleCall = throttle(
      () => EditorTextManager.shared.editorConvertText(editor, undefined),
      200
  )
  editor.addCommand(CodeMD.CMD_ID, () => {
    // Dialog.open(editor);
    throttleCall()
  });
};

export {
  register
};
