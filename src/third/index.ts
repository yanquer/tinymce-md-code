import {Editor} from "tinymce";
import {TextHandler} from "./text-handler";


export const registerThird = (editor: Editor) => {
    // 注册文本处理
    TextHandler.shared.register(editor);
}

