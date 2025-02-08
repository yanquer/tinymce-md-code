
import * as Commands from './api/Commands';
import * as Buttons from './ui/Buttons';
import {CodeMD} from "./common";
import {TextHandler} from "./third/text-handler";

type Editor = any


export default (): void => {
  tinymce.PluginManager.add(CodeMD.ID, (editor: Editor) => {
    Commands.register(editor);
    Buttons.register(editor);

    // 注册文本处理
    TextHandler.shared.register(editor);

    // 返回插件的元数据
    return {} ;
  });
};
