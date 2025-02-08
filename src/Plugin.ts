// import tinymce, {Editor} from 'tinymce';

import * as Commands from './api/Commands';
import * as Buttons from './ui/Buttons';

type Editor = any


export default (): void => {
  // console.log("register codemd -  ")
  // const PluginManager = tinymce.util.Tools.resolve("tinymce.PluginManager")
  // tinymce.PluginManager.add('codemd', (editor: Editor) => {
  tinymce.PluginManager.add('codemd', (editor: Editor) => {
    console.log("register2 codemd -  ")
    Commands.register(editor);
    Buttons.register(editor);

    console.log("register2 codemd ")
    // 返回插件的元数据
    return {} ;
  });
};
