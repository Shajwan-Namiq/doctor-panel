/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */
export function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: any;

    return function (
        this: ThisParameterType<typeof func>,
        ...args: Parameters<typeof func>
    ) {
        const context = this;
        const later = () => {
            timeout = null;
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
