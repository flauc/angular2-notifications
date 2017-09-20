import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleNotificationsComponent} from './simple-notifications/components/simple-notifications.component';
import {NotificationComponent} from './simple-notifications/components/notification.component';
import {MaxPipe} from './simple-notifications/pipes/max.pipe';
import {NotificationsService} from './simple-notifications/services/notifications.service';

// Type
export * from './simple-notifications/interfaces/notification.type';
export * from './simple-notifications/interfaces/options.type';
export * from './simple-notifications/interfaces/icons';

export * from './simple-notifications/components/simple-notifications.component';
export * from './simple-notifications/components/notification.component';
export * from './simple-notifications/pipes/max.pipe';
export * from './simple-notifications/services/notifications.service';

@NgModule({
    providers: [NotificationsService],
    imports: [
      CommonModule
  ],
  declarations: [
      SimpleNotificationsComponent,
      NotificationComponent,
      MaxPipe
  ],
  exports: [SimpleNotificationsComponent]
})
export class SimpleNotificationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimpleNotificationsModule,
    };
  }
}
