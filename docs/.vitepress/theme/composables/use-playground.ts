import { type Docs } from "/#/global";
import { strFromU8, strToU8, zlibSync } from "fflate";

export function utoa(data: string): string {
    const buffer = strToU8(data);
    const zipped = zlibSync(buffer, { level: 9 });
    const binary = strFromU8(zipped, true);
    return btoa(binary);
}

export const usePlayground = function (decodeSourceList: Docs.Source[], mainFilePath: string) {
    const playgroundCodes: Record<string, string> = {};
    console.info(mainFilePath, decodeSourceList);
    decodeSourceList.forEach(item => {
        const fileName = mainFilePath === item.path ? "App.vue" : item.path.substring(item.path.indexOf("/") + 1);
        playgroundCodes[fileName] = item.source;
    });
    return "https://yujinjin.github.io/cms-components/playground/#" + utoa(JSON.stringify(playgroundCodes));
    // return "http://10.96.144.203:8090/#" + utoa(JSON.stringify(playgroundCodes));
};
