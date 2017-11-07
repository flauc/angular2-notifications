import {Icons} from './icons';

export interface Options {
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
  animate?: 'fade' | 'fromTop' | 'fromRight' | 'fromBottom' | 'fromLeft' | 'rotate' | 'scale';
  icons?: Icons;
  position?: ['top' | 'bottom' | 'middle', 'right' | 'left' | 'center'];
}
