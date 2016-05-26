import {ReflectiveInjector} from "@angular/core"
import {NotificationsService} from "./notifications.service"

let service = ReflectiveInjector.resolveAndCreate([NotificationsService]);

export function themeProvider(): string {
    return service.get(NotificationsService).getTheme();
}