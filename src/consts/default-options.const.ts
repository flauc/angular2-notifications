import {DEFAULT_ICONS} from './default-icons.const';
import {Options} from '../interfaces/options.type';

export const DEFAULT_OPTIONS: Options = {
  position: ['bottom', 'right'],
  timeOut: 0,
  showProgressBar: true,
  pauseOnHover: true,
  lastOnBottom: true,
  clickToClose: true,
  clickIconToClose: false,
  maxLength: 0,
  maxStack: 8,
  preventDuplicates: false,
  preventLastDuplicates: false,
  theClass: '',
  rtl: false,
  animate: 'fromRight',
  icons: DEFAULT_ICONS
};
