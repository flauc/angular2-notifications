import {NgModule} from "@angular/core";
import {NotificationsService} from "./notifications.service";
import {SimpleNotificationsComponent} from "./simple-notifications.component";
import {NotificationComponent} from "./notification.component";
import {MaxPipe} from "./max.pipe";

@NgModule({
    declarations: [SimpleNotificationsComponent, NotificationComponent, MaxPipe],
    providers: [NotificationsService],
    exports: [SimpleNotificationsComponent]
})
export class SimpleNotificationsModule {}