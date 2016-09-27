import {Injectable} from '@angular/core';

declare var Notification;

@Injectable()
export class PushNotificationsService {
}

export interface PushNotification {
    title: string
    body: string
}
