export interface Notification {
  id?: string;
  type: string;
  title?: string;
  content?: string;
  override?: any;
  html?: any;
  state?: string;
  createdOn?: Date;
  destroyedOn?: Date;
}
