import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsService} from './notifications.service';
import {SimpleNotificationsComponent} from './simple-notifications.component';
import {NotificationComponent} from './notification.component';
import {MaxPipe} from './max.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SimpleNotificationsComponent, NotificationComponent, MaxPipe],
  providers: [],
  exports: [SimpleNotificationsComponent]
})
export class SimpleNotificationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimpleNotificationsModule,
      providers: [
        NotificationsService
      ]
    };
  }
}
