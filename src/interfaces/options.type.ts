import {Icons} from './icons';

export type Position = ['top' | 'bottom' | 'middle', 'right' | 'left' | 'center'];
export type Animate = 'fade' | 'fromTop' | 'fromRight' | 'fromBottom' | 'fromLeft' | 'rotate' | 'scale';

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
  animate?: Animate;
  icons?: Icons;
}
