import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NotificationEvent} from '../interfaces/notification-event.type';
import {Notification} from '../interfaces/notification.type';
import {Icons} from '../interfaces/icons';
import {DEFAULT_ICONS} from '../consts/default-icons.const';
import {NotificationType} from '../enums/notification-type.enum';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('options') public globalOptions: any
  ) {}

  public emitter = new Subject<NotificationEvent>();
  public icons: Icons = DEFAULT_ICONS;

  set(notification: Notification, to: boolean): Notification {
    notification.id = notification.override && notification.override.id ? notification.override.id : Math.random().toString(36).substring(3);
    notification.click = new EventEmitter<{}>();
    notification.clickIcon = new EventEmitter<{}>();
    notification.timeoutEnd = new EventEmitter<{}>();

    this.emitter.next({command: 'set', notification: notification, add: to});
    return notification;
  };

  success(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({title: title, content: content || '', type: NotificationType.Success, icon: this.icons.success, override: override, context: context}, true);
  }

  error(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({title: title, content: content || '', type: NotificationType.Error, icon: this.icons.error, override: override, context: context}, true);
  }

  alert(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({title: title, content: content || '', type: NotificationType.Alert, icon: this.icons.alert, override: override, context: context}, true);
  }

  info(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({title: title, content: content || '', type: NotificationType.Info, icon: this.icons.info, override: override, context: context}, true);
  }

  warn(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({title: title, content: content || '', type: NotificationType.Warn, icon: this.icons.warn, override: override, context: context}, true);
  }

  bare(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({title: title, content: content || '', type: NotificationType.Bare, icon: 'bare', override: override, context: context}, true);
  }

  // With type method
  create(title: any = '', content: any = '', type = NotificationType.Success, override?: any, context?: any): Notification {
    return this.set({title: title, content: content, type: type, icon: (<any>this.icons)[type], override: override, context: context}, true);
  }

  // HTML Notification method
  html(html: any, type = NotificationType.Success, override?: any, icon = 'bare', context?: any): Notification {
    return this.set({html: html, type: type, icon: (<any>this.icons)[icon], override: override, context: context}, true);
  }

  // Remove all notifications method
  remove(id?: string): void {
    if (id) {
      this.emitter.next({command: 'clean', id: id});
    } else {
      this.emitter.next({command: 'cleanAll'});
    }
  }
}
