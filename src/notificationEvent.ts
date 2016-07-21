import { Notification } from './notification';

export interface NotificationEvent {
  add?: boolean;
  command: string;
  id?: string;
  notification?: Notification;
}
