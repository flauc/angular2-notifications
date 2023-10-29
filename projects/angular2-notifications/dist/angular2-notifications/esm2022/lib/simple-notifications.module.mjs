import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { NotificationComponent } from './components/notification/notification.component';
import { SimpleNotificationsComponent } from './components/simple-notifications/simple-notifications.component';
import { DEFAULT_OPTIONS } from './consts/default-options.const';
import { NotificationsService } from './services/notifications.service';
import * as i0 from "@angular/core";
export const OPTIONS = new InjectionToken('options');
export function optionsFactory(options) {
    return {
        ...DEFAULT_OPTIONS,
        ...options
    };
}
export class SimpleNotificationsModule {
    static forRoot(options = {}) {
        return {
            ngModule: SimpleNotificationsModule,
            providers: [
                NotificationsService,
                {
                    provide: OPTIONS,
                    useValue: options
                },
                {
                    provide: 'options',
                    useFactory: optionsFactory,
                    deps: [OPTIONS]
                }
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsModule, declarations: [SimpleNotificationsComponent,
            NotificationComponent], imports: [CommonModule], exports: [SimpleNotificationsComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        SimpleNotificationsComponent,
                        NotificationComponent
                    ],
                    exports: [SimpleNotificationsComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW5vdGlmaWNhdGlvbnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9zaW1wbGUtbm90aWZpY2F0aW9ucy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUNoSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBRXhFLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBVSxTQUFTLENBQUMsQ0FBQztBQUM5RCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQU87SUFDcEMsT0FBTztRQUNMLEdBQUcsZUFBZTtRQUNsQixHQUFHLE9BQU87S0FDWCxDQUFDO0FBQ0osQ0FBQztBQVlELE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFtQixFQUFFO1FBQ2xDLE9BQU87WUFDTCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFNBQVMsRUFBRTtnQkFDVCxvQkFBb0I7Z0JBQ3BCO29CQUNFLE9BQU8sRUFBRSxPQUFPO29CQUNoQixRQUFRLEVBQUUsT0FBTztpQkFDbEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFVBQVUsRUFBRSxjQUFjO29CQUMxQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ2hCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzt3R0FqQlUseUJBQXlCO3lHQUF6Qix5QkFBeUIsaUJBTGxDLDRCQUE0QjtZQUM1QixxQkFBcUIsYUFKckIsWUFBWSxhQU1KLDRCQUE0Qjt5R0FFM0IseUJBQXlCLFlBUmxDLFlBQVk7OzRGQVFILHlCQUF5QjtrQkFWckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osNEJBQTRCO3dCQUM1QixxQkFBcUI7cUJBQ3RCO29CQUNELE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUN4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEluamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaW1wbGVOb3RpZmljYXRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NpbXBsZS1ub3RpZmljYXRpb25zL3NpbXBsZS1ub3RpZmljYXRpb25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERFRkFVTFRfT1BUSU9OUyB9IGZyb20gJy4vY29uc3RzL2RlZmF1bHQtb3B0aW9ucy5jb25zdCc7XHJcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvb3B0aW9ucy50eXBlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25vdGlmaWNhdGlvbnMuc2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxPcHRpb25zPignb3B0aW9ucycpO1xyXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uc0ZhY3Rvcnkob3B0aW9ucykge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ERUZBVUxUX09QVElPTlMsXHJcbiAgICAuLi5vcHRpb25zXHJcbiAgfTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFNpbXBsZU5vdGlmaWNhdGlvbnNDb21wb25lbnQsXHJcbiAgICBOb3RpZmljYXRpb25Db21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtTaW1wbGVOb3RpZmljYXRpb25zQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2ltcGxlTm90aWZpY2F0aW9uc01vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogT3B0aW9ucyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxTaW1wbGVOb3RpZmljYXRpb25zTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU2ltcGxlTm90aWZpY2F0aW9uc01vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgTm90aWZpY2F0aW9uc1NlcnZpY2UsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogT1BUSU9OUyxcclxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiAnb3B0aW9ucycsXHJcbiAgICAgICAgICB1c2VGYWN0b3J5OiBvcHRpb25zRmFjdG9yeSxcclxuICAgICAgICAgIGRlcHM6IFtPUFRJT05TXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19