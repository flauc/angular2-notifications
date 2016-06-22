import {Injectable} from "@angular/core";

declare var Notification;

@Injectable()
export class PushNotificationsService {

    canActivate: boolean = false;

    activate(): {success: boolean, message?: string} {
        if (!("Notification" in window)) return {success: false, message: "This browser does not support desktop notification."};
        if (Notification.permission === "granted") return {success: true, message: "Permission already granted."};

        else if (Notification.permission !== "denied") {
            Notification.requestPermission()
                .then(a => {
                    if (a === "denied") console.log("Permission wasn't granted");
                    else if (a === "default") console.log("The permission request was dismissed.");
                    else this.createBuffered();
                })
        }

    }



    // private canCreate: boolean = false;
    // private notificationBuffer: PushNotification;
    //
    //
    //
    // create(data: PushNotification): any {
    //
    //     if (!this.canCreate) {
    //         this.notificationBuffer = data;
    //         this.getPermission();
    //         return;
    //     }
    //
    //     let notification = new Notification(data.title, {
    //         body: data.body
    //     });
    //
    //     return notification;
    // }
    //
    // getPermission(): void {
    //     if (!("Notification" in window)) {
    //         console.log("This browser does not support desktop notification.");
    //         return;
    //     }
    //
    //     if (Notification.permission === "granted") this.createBuffered();
    //
    //     else if (Notification.permission !== "denied") {
    //         Notification.requestPermission()
    //             .then(a => {
    //                 if (a === "denied") console.log("Permission wasn't granted");
    //                 else if (a === "default") console.log("The permission request was dismissed.");
    //                 else this.createBuffered();
    //             })
    //     }
    // }
    //
    // private createBuffered() {
    //     this.canCreate = true;
    //     if (this.notificationBuffer) {
    //         this.create(this.notificationBuffer);
    //         this.notificationBuffer = null;
    //     }
    // }
}

export interface PushNotification {
    title: string
    body: string
}
