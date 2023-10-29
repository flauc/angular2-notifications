import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { Options } from './interfaces/options.type';
import * as i0 from "@angular/core";
import * as i1 from "./components/simple-notifications/simple-notifications.component";
import * as i2 from "./components/notification/notification.component";
import * as i3 from "@angular/common";
export declare const OPTIONS: InjectionToken<Options>;
export declare function optionsFactory(options: any): any;
export declare class SimpleNotificationsModule {
    static forRoot(options?: Options): ModuleWithProviders<SimpleNotificationsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleNotificationsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SimpleNotificationsModule, [typeof i1.SimpleNotificationsComponent, typeof i2.NotificationComponent], [typeof i3.CommonModule], [typeof i1.SimpleNotificationsComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SimpleNotificationsModule>;
}
