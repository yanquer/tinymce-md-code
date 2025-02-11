
export namespace Logger {

    export const debug = (...msg: any[]): void => {
        console.log(...msg);
    }

    export const info = (...msg: any[]) => {
        console.info(...msg);
    }

    export const warning = (...msg: any[]) => {
        console.warn(...msg);
    }

    export const error = (...msg: any[]) => {
        console.error(...msg);
    }
}



