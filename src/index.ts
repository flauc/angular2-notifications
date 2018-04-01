import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleNotificationsComponent} from './components/simple-notifications/simple-notifications.component';
import {NotificationComponent} from './components/notification/notification.component';
import {NotificationsService} from './services/notifications.service';
import {Options} from './interfaces/options.type';
import {DEFAULT_OPTIONS} from './consts/default-options.const';

export * from './components/notification/notification.component';
export * from './components/simple-notifications/simple-notifications.component';
export * from './services/notifications.service';
export * from './interfaces/icons';
export * from './interfaces/notification-event.type';
export * from './interfaces/notification.type';
export * from './interfaces/options.type';

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
  static forRoot(options: Options = {}): ModuleWithProviders {
    return {
      ngModule: SimpleNotificationsModule,
      providers: [
        NotificationsService,
        {
          provide: 'options',
          useValue: {
            ...DEFAULT_OPTIONS,
            ...options
          }
        }
      ]
    };
  }
}
