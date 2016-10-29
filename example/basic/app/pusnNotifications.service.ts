import {Injectable, EventEmitter} from "@angular/core"
import {Observable} from "rxjs"

declare var Notification;

@Injectable()
export class PushNotificationsService {
    private _canCreate: boolean = false;

    create(data: PushNotification, options: PushNotificationOptions) {
        // if (!this.canCreate) {
        //     this.notificationBuffer = data;
        //     this.getPermission();
        //     return;
        // }

        let notification = new Notification(data.title, {
            body: data.body
        });
        //
        // options.events.forEach(event => )


        return notification;
    }

    getPermission() {
        return new Promise((resolve, reject) => {
            if (!("Notification" in window))  return reject("This browser does not support desktop notification.");

            if (Notification.permission === "granted") {
                this._canCreate = true;
                return resolve("Permission was already granted");
            }

            if (Notification.permission !== "denied") {
                Notification.requestPermission()
                    .then(a => {
                        if (a === "denied") return reject("Permission wasn't granted");
                        if (a === "default") return reject("The permission request was dismissed.");

                        this._canCreate = true;
                        resolve("Permission granted")
                    })
            }
        })
    }

    private createBuffered() {
        this.canCreate = true;
        if (this.notificationBuffer) {
            this.create(this.notificationBuffer);
            this.notificationBuffer = null;
        }
    }
}

export interface PushNotification {
    title: string
    body: string
}

export interface PushNotificationOptions {
    events: string[]
}
