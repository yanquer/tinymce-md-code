
// 节流函数类型定义
type ThrottledFunction<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): void;
    // 已经执行的无法 cancel
    cancel: () => void;
    flush: () => void;
};

// 节流函数实现
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number,
    options?: { leading?: boolean; trailing?: boolean }
): ThrottledFunction<T>  => {
    let inThrottle: boolean = false;
    let lastTimeout: NodeJS.Timeout | null = null;
    let lastInvokeTime: number = 0;
    let cancelExec = false;

    // 节流周期中先执行
    const leading = options?.leading ?? true;
    // 节流周期中后执行
    const trailing = options?.trailing ?? !leading;

    if (leading === trailing){
        throw new Error("leading must not equal to trailing")
    }
    if (limit < 0){
        throw new Error("limit must be greater than 0");
    }

    const executedFunction = (...args: Parameters<T>): void => {
        if (cancelExec){
            lastTimeout && clearTimeout(lastTimeout)
            return;
        }

        const now = Date.now();
        // 启动时间
        lastInvokeTime = lastInvokeTime || now;
        // 计算剩余时间 ms
        const remainingTime = limit - (now - lastInvokeTime);

        const restart = () => {
            inThrottle = false;
            lastInvokeTime = 0;
            executedFunction(...args)
        }

        // 节流周期内
        if (inThrottle) {
            if (leading){
                if (remainingTime <= 0) {
                    restart()
                }
                return
            } else if (trailing){
                // 覆盖上一个 lastTimeout
                if (remainingTime > 0) {
                    lastTimeout && clearTimeout(lastTimeout)
                    lastTimeout = setTimeout(() => func(args), remainingTime)
                } else {
                    restart()
                }
                return;
            }

        }

        if (remainingTime > 0){
            // 节流周期内 leading 就马上调用
            if (!inThrottle && leading){
                inThrottle = true;
                func(args);
            } else if (!inThrottle && trailing){
                inThrottle = true;
                lastTimeout = setTimeout(() => func(args), remainingTime)
            }
        } else {
            restart()
        }

    }

    executedFunction.cancel = () => {
        cancelExec = true
    };

    executedFunction.flush = () => {

    };

    return executedFunction;
}

