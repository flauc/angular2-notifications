import { Notification } from "./notification";
import { NotificationsService } from "./notifications.service";
export declare class NotificationsComponent {
    private _service;
    constructor(_service: NotificationsService);
    private listener;
    notifications: Notification[];
    private lastOnBottom;
    private maxStack;
    options: any;
    private timeOut;
    private maxLength;
    private clickToClose;
    private showProgressBar;
    private pauseOnHover;
    ngOnInit(): void;
    add(item: any): void;
    attachChanges(): void;
    ngOnDestroy(): void;
}
