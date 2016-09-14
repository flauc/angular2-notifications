import { OnInit, OnDestroy, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

export interface Icons {
    alert: string;
    error: string;
    info: string;
    success: string;
}
export declare let defaultIcons: {
    alert: string;
    error: string;
    info: string;
    success: string;
};

export declare class MaxPipe implements PipeTransform {
    transform(value: any, args: any): any;
}

export interface NotificationEvent {
    add?: boolean;
    command: string;
    id?: string;
    notification?: Notification;
}

export interface NotificationType {
    name: string;
    color: string;
}

export declare class NotificationComponent implements OnInit, OnDestroy {
    private _service;
    private _sanitizer;
    constructor(_service: NotificationsService, _sanitizer: DomSanitizer);
    icons: Icons;
    safeSvg: SafeHtml;
    item: Notification;
    maxLength: number;
    showProgressBar: boolean;
    theClass: string;
    rtl: boolean;
    animate: string;
    overrides: any;
    progressWidth: number;
    private stopTime;
    private timer;
    private steps;
    private speed;
    private count;
    private start;
    private diff;
    private timeOut;
    private position;
    private clickToClose;
    private pauseOnHover;
    ngOnInit(): void;
    startTimeOut(): void;
    onEnter(): void;
    onLeave(): void;
    setPosition(): number;
    removeOnClick(): void;
    attachOverrides(): void;
    ngOnDestroy(): void;
    private instance;
    private _remove();
}

export interface Notification {
    id?: string;
    type: string;
    createdOn?: Date;
    title?: string;
    content?: string;
    override?: any;
    html?: any;
}

export declare class NotificationsService {
    private _emitter;
    set(notification: Notification, to: boolean): Notification;
    getChangeEmitter(): any;
    success(title: string, content: string, override?: any): Notification;
    error(title: string, content: string, override?: any): Notification;
    alert(title: string, content: string, override?: any): Notification;
    info(title: string, content: string, override?: any): Notification;
    bare(title: string, content: string, override?: any): Notification;
    create(title: string, content: string, type: string, override?: any): Notification;
    html(html: any, type: string, override?: any): Notification;
    remove(id?: string): void;
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

export declare class PushNotificationsService {
    canActivate: boolean;
    activate(): {
        success: boolean;
        message?: string;
    };
}
export interface PushNotification {
    title: string;
    body: string;
}

export declare class SimpleNotificationsComponent implements OnInit, OnDestroy {
    private _service;
    constructor(_service: NotificationsService);
    options: Options;
    onCreate: any;
    onDestroy: any;
    notifications: Notification[];
    position: ["top" | "bottom", "right" | "left"];
    private listener;
    private lastOnBottom;
    private maxStack;
    private preventLastDuplicates;
    private preventDuplicates;
    private timeOut;
    private maxLength;
    private clickToClose;
    private showProgressBar;
    private pauseOnHover;
    private theClass;
    private rtl;
    private animate;
    private expand;
    private icons;
    private lastNotificationCreated;
    ngOnInit(): void;
    defaultBehavior(value: any): void;
    add(item: any): void;
    block(item: any): boolean;
    attachChanges(options: any): void;
    buildEmit(notification: Notification, to: boolean): {
        createdOn: Date;
        type: string;
        id: string;
    };
    cleanSingle(id: string): void;
    ngOnDestroy(): void;
}

export declare class SimpleNotificationsModule {
}
