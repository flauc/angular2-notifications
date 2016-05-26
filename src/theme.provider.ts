import {ReflectiveInjector} from "@angular/core"
import {NotificationsService} from "./notifications.service"

let service = ReflectiveInjector.resolveAndCreate([NotificationsService]);

export function themeProvider(): string {
    console.log(service.get(NotificationsService).getTheme());
    return service.get(NotificationsService).getTheme();
}