import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsService} from './notifications.service';
import {SimpleNotificationsComponent} from './simple-notifications.component';
import {NotificationComponent} from './notification.component';
import {MaxCharacterePipe} from './max-charactere.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SimpleNotificationsComponent, NotificationComponent, MaxCharacterePipe],
  providers: [NotificationsService],
  exports: [SimpleNotificationsComponent]
})
export class SimpleNotificationsModule {
}
