import {CodeMdOptions} from "./common";
import {GlobalMdArgs} from "./global-md-args";

enum LogLevel{
    ALL = 1,
    TRACE = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6,
    FATAL = 7,
    OFF = 8,
}

export namespace Logger {

    const _logNumber = (): LogLevel => {
        const options: CodeMdOptions | undefined = GlobalMdArgs.shared.mdOptions
        const level = options?.logLevel ?? "info"

        switch (level) {
            case "debug":
                return LogLevel.DEBUG
            case "info":
                return LogLevel.INFO
            case "warn":
                return LogLevel.WARN
            case "error":
                return LogLevel.ERROR
        }

        return LogLevel.DEBUG
    }
    // const logNumber = _logNumber()

    export const debug = (...msg: any[]): void => {
        _logNumber() <= LogLevel.DEBUG && console.log(...msg);
    }

    export const info = (...msg: any[]) => {
        _logNumber() <= LogLevel.INFO && console.info(...msg);
    }

    export const warning = (...msg: any[]) => {
        _logNumber() <= LogLevel.WARN && console.warn(...msg);
    }

    export const error = (...msg: any[]) => {
        _logNumber() <= LogLevel.ERROR && console.error(...msg);
    }
}



