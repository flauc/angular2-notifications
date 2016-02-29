import {Injectable} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {Notification} from "./notification";

@Injectable()
export class NotificationsService {
    public emiter : EventEmitter<any> = new EventEmitter();

    set(notification: any, to: boolean) { this.emiter.emit({notification: notification, add: to}) };
    getChangeEmitter() { return this.emiter }

    //// Access methods
    success(title: string, content: string, override?: any) { this.set({title: title, content: content, type: 'success', override: override}, true) }
    error(title: string, content: string, override?: any) { this.set({title: title, content: content, type: 'error', override: override}, true) }
    alert(title: string, content: string, override?: any) { this.set({title: title, content: content, type: 'alert', override: override}, true) }
    info(title: string, content: string, override?: any) { this.set({title: title, content: content, type: 'info', override: override}, true) }

    // Remove all notifications method
    removeAll() { this.emiter.emit('clean') }

}