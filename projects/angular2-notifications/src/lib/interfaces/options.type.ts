import {Icons} from './icons';
import {NotificationAnimationType} from '../enums/notification-animation-type.enum';

export type VerticalPosition = 'top' | 'bottom' | 'middle';
export type HorizontalPosition = 'right' | 'left' | 'center';
export interface Position extends Array<VerticalPosition | HorizontalPosition> {
    0: VerticalPosition;
    1: HorizontalPosition;
}

export interface Options {
  position?: Position;
  timeOut?: number;
  showProgressBar?: boolean;
  pauseOnHover?: boolean;
  lastOnBottom?: boolean;
  clickToClose?: boolean;
  clickIconToClose?: boolean;
  maxLength?: number;
  maxStack?: number;
  preventDuplicates?: boolean;
  preventLastDuplicates?: boolean | string;
  theClass?: string;
  rtl?: boolean;
  animate?: NotificationAnimationType;
  icons?: Icons;
}
