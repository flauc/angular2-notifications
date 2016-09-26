export interface Notification {
  id?: string;
  type: string;
  icon: string;
  title?: string;
  content?: string;
  override?: Notification;
  html?: any;
  state?: string;
  createdOn?: Date;
  destroyedOn?: Date;
}
