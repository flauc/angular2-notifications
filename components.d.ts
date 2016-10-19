import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface Icons {
    alert: string;
    error: string;
    info: string;
    success: string;
}
export declare const defaultIcons: Icons;

export declare class MaxPipe implements PipeTransform {
    transform(value: string, ...args: any[]): any;
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
    private notificationService;
    private domSanitizer;
    timeOut: number;
    showProgressBar: boolean;
    pauseOnHover: boolean;
    clickToClose: boolean;
    maxLength: number;
    theClass: string;
    rtl: boolean;
    animate: string;
    position: number;
    item: Notification;
    progressWidth: number;
    private stopTime;
    private timer;
    private steps;
    private speed;
    private count;
    private start;
    private diff;
    private safeSvg;
    constructor(notificationService: NotificationsService, domSanitizer: DomSanitizer);
    ngOnInit(): void;
    startTimeOut(): void;
    onEnter(): void;
    onLeave(): void;
    setPosition(): number;
    removeOnClick(): void;
    attachOverrides(): void;
    ngOnDestroy(): void;
    private instance;
    private remove();
}

export interface Notification {
    id?: string;
    type: string;
    icon: string;
    title?: string;
    content?: string;
    override?: any;
    html?: any;
    state?: string;
    createdOn?: Date;
    destroyedOn?: Date;
    click?: EventEmitter<{}>;
}

export declare class NotificationsService {
    private emitter;
    private icons;
    set(notification: Notification, to: boolean): Notification;
    getChangeEmitter(): Subject<NotificationEvent>;
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
    animate?: 'fromRight' | 'fromLeft' | 'rotate' | 'scale';
    icons?: Icons;
    position?: ['top' | 'bottom', 'right' | 'left'];
}

export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
    body?: string;
    icon?: string;
    tag?: string;
    renotify?: boolean;
    silent?: boolean;
    sound?: string;
    noscreen?: boolean;
    sticky?: boolean;
    dir?: 'auto' | 'ltr' | 'rtl';
    lang?: string;
    vibrate?: number[];
}

export declare class PushNotificationsModule {
}

export declare class PushNotificationsService {
    permission: Permission;
    requestPermission(): void;
    create(title: string, options?: PushNotification): any;
}

export declare class SimpleNotificationsComponent implements OnInit, OnDestroy {
    private _service;
    options: Options;
    onCreate: EventEmitter<{}>;
    onDestroy: EventEmitter<{}>;
    notifications: Notification[];
    position: ['top' | 'bottom', 'right' | 'left'];
    private lastNotificationCreated;
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
    private icons;
    constructor(_service: NotificationsService);
    ngOnInit(): void;
    defaultBehavior(value: any): void;
    add(item: Notification): void;
    block(item: Notification): boolean;
    checkStandard(checker: Notification, item: Notification): boolean;
    checkHtml(checker: Notification, item: Notification): boolean;
    attachChanges(options: any): void;
    buildEmit(notification: Notification, to: boolean): Notification;
    cleanSingle(id: string): void;
    ngOnDestroy(): void;
}

export declare class SimpleNotificationsModule {
}
