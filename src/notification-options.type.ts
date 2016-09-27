export class NotificationOptions {
  timeOut?: number = 6000;                         // default 0
  showProgressBar?: boolean = true;                // default true
  pauseOnHover?: boolean = true;                   // default true
  lastOnBottom?: boolean = true; //default true
  clickToClose?: boolean = true; //true
  maxLength?: number = 0; //0
  maxStacks?: number = 7;
  preventDuplicates?: boolean = true;
  preventLastDuplicates?: boolean = false;
  theClass?: string;
  rtl?: boolean = false;
  animate?: 'fromRight' | 'fromLeft' | 'rotate' | 'scale' = 'fromRight';  // default 'fromRight';
  position?: ['top' | 'bottom', 'right' | 'left'] = ['bottom', 'right'];
}
