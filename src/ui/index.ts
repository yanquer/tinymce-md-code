import {Editor} from "tinymce";
import {ButtonsUtil} from "./Buttons";
import {MdTextEditor} from "./md-text-editor";

export const registerUi = (editor: Editor) => {
    MdTextEditor.shared.doInit()
    ButtonsUtil.shared.register(editor);
}


