import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate";

/**
 *
 * 函数防抖
 * @param callback 执行的函数
 * @param wait 等待的时间
 * @returns Function
 */
export function debounce(callback: (...args: any[]) => void, wait: number = 100) {
    let timeout;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            callback.apply(this, args);
        }, wait);
    };
}

export function utoa(data: string): string {
    const buffer = strToU8(data);
    const zipped = zlibSync(buffer, { level: 9 });
    const binary = strFromU8(zipped, true);
    return btoa(binary);
}

export function atou(base64: string): string {
    const binary = atob(base64);

    // zlib header (x78), level 9 (xDA)
    if (binary.startsWith("\x78\xDA")) {
        const buffer = strToU8(binary, true);
        const unzipped = unzlibSync(buffer);
        return strFromU8(unzipped);
    }

    // old unicode hacks for backward compatibility
    // https://base64.guru/developers/javascript/examples/unicode-strings
    return decodeURIComponent(escape(binary));
}
