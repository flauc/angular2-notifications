import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NotificationComponent } from './components/notification/notification.component';
import { SimpleNotificationsComponent } from './components/simple-notifications/simple-notifications.component';
import { DEFAULT_OPTIONS } from './consts/default-options.const';
import { Options } from './interfaces/options.type';
import { NotificationsService } from './services/notifications.service';

export const OPTIONS = new InjectionToken<Options>('options');
export function optionsFactory(options) {
  return {
    ...DEFAULT_OPTIONS,
    ...options
  };
}

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
  static forRoot(options: Options = {}): ModuleWithProviders<SimpleNotificationsModule> {
    return {
      ngModule: SimpleNotificationsModule,
      providers: [
        NotificationsService,
        {
          provide: OPTIONS,
          useValue: options
        },
        {
          provide: 'options',
          useFactory: optionsFactory,
          deps: [OPTIONS]
        }
      ]
    };
  }
}
