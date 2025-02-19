import {Editor} from "tinymce";
import * as Commands from './api/Commands';
import {CodeMD} from "./common/common";
import {registerUi} from "./ui";
import {registerThird} from "./third";
import {registerLang} from "./lang";
import {GlobalMdArgs} from "./common/global-md-args";


export default (): void => {
  tinymce.PluginManager.add(CodeMD.ID, (editor: Editor) => {

    // 参数解析, 暂存到全局环境
    GlobalMdArgs.shared.register(editor)

    Commands.register(editor);

    registerUi(editor);
    registerThird(editor);
    registerLang(tinymce.addI18n);

    // 返回插件的元数据
    return {
      getMetadata:  () => ({
        name: CodeMD.TITLE as string,
        url: "https://github.com/yanquer/tinymce-md-code"
      })
    } ;
  });
};
