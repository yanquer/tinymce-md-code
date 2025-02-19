import {CodeMD, CodeMdOptions} from "./common";
import {Editor} from "tinymce";

export class GlobalMdArgs {
    static shared = new GlobalMdArgs();

    register(editor?: Editor){
        const options: CodeMdOptions | undefined = editor.getParam(CodeMD.ID)
        this.mdOptions = options;
    }

    mdOptions?: CodeMdOptions
}





