import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleNotificationsComponent} from './components/simple-notifications/simple-notifications.component';
import {NotificationComponent} from './components/notification/notification.component';
import {NotificationsService} from './services/notifications.service';

export * from './components/notification/notification.component';
export * from './components/simple-notifications/simple-notifications.component';
export * from './services/notifications.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SimpleNotificationsComponent,
    NotificationComponent
  ],
  exports: [SimpleNotificationsComponent]
})
export class SimpleNotificationsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimpleNotificationsModule,
      providers: [NotificationsService]
    };
  }
}
