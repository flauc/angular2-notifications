export interface Notification {
    id?: string;
    type: string;
    createdOn?: Date;
    title?: string;
    content?: string;
    override?: any;
    html?: any;
}

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
    animate?: "fromRight" | "fromLeft" | "rotate" | "scale";
    icons?: Icons;
    position?: ["top" | "bottom", "right" | "left"];
}

export interface Icons {
    alert: string;
    error: string;
    info: string;
    success: string;
}

export declare class SimpleNotificationsModule {}

export declare class SimpleNotificationsComponent {}

export declare class NotificationsService {
    success(title: string, content: string, override?: any): Notification;
    error(title: string, content: string, override?: any): Notification;
    alert(title: string, content: string, override?: any): Notification;
    info(title: string, content: string, override?: any): Notification;
    bare(title: string, content: string, override?: any): Notification;
    create(title: string, content: string, type: string, override?: any): Notification;
    html(html: any, type: string, override?: any): Notification;
    remove(id?: string): void;
}

export declare class PushNotificationsService {
    create(data: {title: string, body: string}): void
}

