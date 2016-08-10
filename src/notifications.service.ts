import {Injectable} from "@angular/core"
import {Subject} from 'rxjs/Rx';
import {Notification} from './notification';
import {NotificationEvent} from './notification-event';

@Injectable()
export class NotificationsService {

    private _emitter: Subject<NotificationEvent> = new Subject();

    set(notification: Notification, to: boolean) {
        notification.id = notification.override && notification.override.id ? notification.override.id : Math.random().toString(36).substring(3);
        this._emitter.next({command: "set", notification: notification, add: to});
        return notification;

    };
    getChangeEmitter() { return this._emitter }

    //// Access methods
    success(title: string, content: string, override?: any) { return this.set({title: title, content: content, type: "success", override: override}, true) }
    error(title: string, content: string, override?: any) { return this.set({title: title, content: content, type: "error", override: override}, true) }
    alert(title: string, content: string, override?: any) { return this.set({title: title, content: content, type: "alert", override: override}, true) }
    info(title: string, content: string, override?: any) { return this.set({title: title, content: content, type: "info", override: override}, true) }
    bare(title: string, content: string, override?: any) { return this.set({title: title, content: content, type: "bare", override: override}, true) }

    // With type method
    create(title: string, content: string, type: string, override?: any) { return this.set({title: title, content: content, type: type, override: override}, true) }

    // HTML Notification method
    html(html: any, type: string, override?: any) { return this.set({html: html, type: type, override: override, title: null, content: null}, true) }

    // Remove all notifications method
    remove(id?: string) {
        if (id) this._emitter.next({command: "clean", id: id});
        else this._emitter.next({command: "cleanAll"});
    }

}
