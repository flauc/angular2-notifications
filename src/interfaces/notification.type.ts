import {EventEmitter} from '@angular/core';

export interface Notification {
  id?: string
  type: string
  icon: string
  title?: any
  content?: any
  override?: any
  html?: any
  state?: string
  createdOn?: Date
  destroyedOn?: Date
  animate?: string
  timeOut?: number
  maxLength?: number
  pauseOnHover?: boolean
  clickToClose?: boolean
  clickIconToClose?: boolean
  theClass?: string
  click?: EventEmitter<{}>;
  clickIcon?: EventEmitter<{}>;
  timeoutEnd?: EventEmitter<{}>;
}
