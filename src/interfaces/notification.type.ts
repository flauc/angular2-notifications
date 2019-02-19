import {EventEmitter} from '@angular/core';
import {NotificationType} from '../enums/notification-type.enum';
import {NotificationAnimationType} from '../enums/notification-animation-type.enum';

export interface Notification {
  id?: string;
  type: NotificationType;
  icon: string;
  title?: any;
  content?: any;
  override?: any;
  html?: any;
  state?: string;
  createdOn?: Date;
  destroyedOn?: Date;
  animate?: NotificationAnimationType;
  timeOut?: number;
  maxLength?: number;
  pauseOnHover?: boolean;
  clickToClose?: boolean;
  clickIconToClose?: boolean;
  theClass?: string;
  click?: EventEmitter<{}>;
  clickIcon?: EventEmitter<{}>;
  timeoutEnd?: EventEmitter<{}>;
  context?: any;
}
