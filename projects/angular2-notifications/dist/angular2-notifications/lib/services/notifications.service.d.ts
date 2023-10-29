import { Subject } from 'rxjs';
import { NotificationType } from '../enums/notification-type.enum';
import { Icons } from '../interfaces/icons';
import { NotificationEvent } from '../interfaces/notification-event.type';
import { Notification } from '../interfaces/notification.type';
import * as i0 from "@angular/core";
export declare class NotificationsService {
    globalOptions: any;
    constructor(globalOptions: any);
    emitter: Subject<NotificationEvent>;
    icons: Icons;
    set(notification: Notification, to: boolean): Notification;
    success(title?: any, content?: any, override?: any, context?: any): Notification;
    error(title?: any, content?: any, override?: any, context?: any): Notification;
    alert(title?: any, content?: any, override?: any, context?: any): Notification;
    info(title?: any, content?: any, override?: any, context?: any): Notification;
    warn(title?: any, content?: any, override?: any, context?: any): Notification;
    bare(title?: any, content?: any, override?: any, context?: any): Notification;
    create(title?: any, content?: any, type?: NotificationType, override?: any, context?: any): Notification;
    html(html: any, type?: NotificationType, override?: any, icon?: string, context?: any): Notification;
    remove(id?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationsService>;
}
