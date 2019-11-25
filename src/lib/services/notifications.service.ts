import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_ICONS } from '../consts/default-icons.const';
import { NotificationType } from '../enums/notification-type.enum';
import { Icons } from '../interfaces/icons';
import { NotificationEvent } from '../interfaces/notification-event.type';
import { Notification } from '../interfaces/notification.type';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('options') public globalOptions: any
  ) { }

  emitter = new Subject<NotificationEvent>();
  icons: Icons = DEFAULT_ICONS;

  set(notification: Notification, to: boolean): Notification {
    notification.id = notification.override && notification.override.id ?
      notification.override.id :
      Math.random().toString(36).substring(3);
    notification.click = new EventEmitter<{}>();
    notification.clickIcon = new EventEmitter<{}>();
    notification.timeoutEnd = new EventEmitter<{}>();

    this.emitter.next({ command: 'set', notification, add: to });
    return notification;
  }

  success(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({ title, content: content || '', type: NotificationType.Success, icon: this.icons.success, override, context }, true);
  }

  error(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({ title, content: content || '', type: NotificationType.Error, icon: this.icons.error, override, context }, true);
  }

  alert(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({ title, content: content || '', type: NotificationType.Alert, icon: this.icons.alert, override, context }, true);
  }

  info(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({ title, content: content || '', type: NotificationType.Info, icon: this.icons.info, override, context }, true);
  }

  warn(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({ title, content: content || '', type: NotificationType.Warn, icon: this.icons.warn, override, context }, true);
  }

  bare(title: any = '', content: any = '', override?: any, context?: any): Notification {
    return this.set({ title, content: content || '', type: NotificationType.Bare, icon: 'bare', override, context }, true);
  }

  // With type method
  create(title: any = '', content: any = '', type = NotificationType.Success, override?: any, context?: any): Notification {
    return this.set({ title, content, type, icon: (this.icons as any)[type], override, context }, true);
  }

  // HTML Notification method
  html(html: any, type = NotificationType.Success, override?: any, icon = 'bare', context?: any): Notification {
    return this.set({ html, type, icon: (this.icons as any)[icon], override, context }, true);
  }

  // Remove all notifications method
  remove(id?: string): void {
    if (id) {
      this.emitter.next({ command: 'clean', id });
    } else {
      this.emitter.next({ command: 'cleanAll' });
    }
  }
}
