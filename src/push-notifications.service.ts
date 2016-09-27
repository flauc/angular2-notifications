import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PushNotification, Permission} from './push-notification.type';

declare const Notification: any;

@Injectable()
export class PushNotificationsService {

    permission: Permission = 'granted';

    getPermission() {
        if ('Notification' in window)
            Notification.requestPermission(status => this.permission = status);
    }

    create(title: string, options?: PushNotification): any {

        return new Observable(obs => {

            if (!('Notification' in window)) {
                obs.error('Notifications are not available in this envirement');
                obs.complete();
            }

            this.permission = Notification.permission;

            if (this.permission !== 'granted') {
                obs.error(`The user didn't granted you permission to send push notifications`);
                obs.complete();
            }

            const n = new Notification(title, options);

            n.onclick = (e) => obs.next({notification: n, event: e});
            n.onerror = (e) => obs.error({notification: n, event: e});
            n.onclose = () => obs.complete();
            n.close = () => {
                n.close.bind(n);
                obs.complete();
            };
        });
    }

}