
import * as Commands from './api/Commands';
import {CodeMD} from "./common";
import {TextHandler} from "./third/text-handler";
import {ButtonsUtil} from "./ui/Buttons";

type Editor = any


export default (): void => {
  tinymce.PluginManager.add(CodeMD.ID, (editor: Editor) => {
    Commands.register(editor);
    ButtonsUtil.shared.register(editor);

    // 注册文本处理
    TextHandler.shared.register(editor);

    // 返回插件的元数据
    return {} ;
  });
};
