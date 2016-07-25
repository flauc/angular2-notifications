import {Icons} from "./icons"

export interface Options {
    timeOut?: number;
    showProgressBar?: boolean;
    pauseOnHover?: boolean;
    lastOnBottom?: boolean;
    clickToClose?: boolean;
    maxLength?: number;
    maxStacks?: number;
    preventDuplicates?: number;
    preventLastDuplicates?: boolean | string;
    theClass?: string;
    rtl?: boolean;
    animate?: boolean;
    icons?: Icons;
    position?: ["top" | "bottom", "right" | "left"];
}