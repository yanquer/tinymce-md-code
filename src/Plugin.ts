import {Editor} from "tinymce";
import * as Commands from './api/Commands';
import {CodeMD} from "./common";
import {registerUi} from "./ui";
import {registerThird} from "./third";


export default (): void => {
  tinymce.PluginManager.add(CodeMD.ID, (editor: Editor) => {
    Commands.register(editor);

    registerUi(editor);
    registerThird(editor);

    // 返回插件的元数据
    return {
      getMetadata:  () => ({
        name: CodeMD.TITLE,
        url: "https://github.com/yanquer/tinymce-md-code"
      })
    } ;
  });
};
