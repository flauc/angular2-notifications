import {NgModule} from '@angular/core';
import {PushNotificationsService} from './push-notifications/services/push-notifications.service';

export * from './push-notifications/interfaces/push-notification.type';
export * from './push-notifications/services/push-notifications.service';

@NgModule({
    providers: [PushNotificationsService],
    exports: []
})
export class PushNotificationsModule {}