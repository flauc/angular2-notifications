import {Component, ViewEncapsulation, EventEmitter, OnInit, OnDestroy} from "angular2/core";
import {Notification} from "./notification";
import {NotificationsService} from "./notifications.service";
import {NotificationComponent} from "./notification.component";


@Component({
    selector: 'simple-notifications',
    directives: [NotificationComponent],
    inputs: ['options'],
    outputs: ['onCreate', 'onDestroy'],
    encapsulation: ViewEncapsulation.Native,
    template: `
        <div class="notification-wrapper">
            <simple-notification
                *ngFor="#a of notifications; #i = index"
                [item]="a"
                [timeOut]="timeOut"
                [clickToClose]="clickToClose"
                [maxLength]="maxLength"
                [showProgressBar]="showProgressBar"
                [pauseOnHover]="pauseOnHover"
                [theClass]="theClass"
                [position]="i">

            </simple-notification>
        </div>
    `,
    styles: [`
        .notification-wrapper {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            z-index: 1000;
        }
    `]
})

export class NotificationsComponent {
    constructor(
        private _service: NotificationsService
    ) {}

    private listener : any;
    public notifications : Notification[] = [];

    // Received values
    private lastOnBottom: boolean = true;
    private maxStack: number = 8;
    private preventLastDuplicates: boolean = false;
    private preventDuplicates: boolean = false;

    public options: any;

    // Sent values
    private timeOut: number = 0;
    private maxLength: number = 0;
    private clickToClose: boolean = true;
    private showProgressBar: boolean = false;
    private pauseOnHover: boolean = true;
    private theClass: string;

    // Outputs
    private onCreate = new EventEmitter();
    private onDestroy = new EventEmitter();

    ngOnInit() {
        // Listen for changes in the service
        this.listener = this._service.getChangeEmitter()
            .subscribe(item => {
                if(item == 'clean') this.notifications = [];
                else if(item.add) this.add(item.notification);
                else {
                    this.notifications.splice(this.notifications.indexOf(item.notification), 1);
                    this.onDestroy.emit(this.buildEmit(item.notification, false));
                }
            });

        this.attachChanges();
    }


    // Add the new notification to the notification array
    add(item) {
        item.createdOn = new Date();
        item.id = Math.random().toString(36).substring(3);

        let toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;

        if(!toBlock) {
            // Check if the notification should be added at the start or the end of the array
            if(this.lastOnBottom) {
                if(this.notifications.length >= this.maxStack) this.notifications.splice(0,1);
                this.notifications.push(item);
            } else {
                if(this.notifications.length >= this.maxStack) this.notifications.splice(this.notifications.length - 1, 1);
                this.notifications.splice(0, 0, item);
            }

            this.onCreate.emit(this.buildEmit(item, true));
        }
    }

    // Check if notifications should be prevented
    block(item) {
        if(this.preventDuplicates && this.notifications.length > 0) for(let i = 0; i < this.notifications.length; i++) if(this.notifications[i].type == item.type && this.notifications[i].title == item.title && this.notifications[i].content == item.content) return true;

        if(this.preventLastDuplicates && this.notifications.length > 0) {
            if(this.lastOnBottom) return this.notifications[this.notifications.length - 1].type == item.type && this.notifications[this.notifications.length - 1].title == item.title && this.notifications[this.notifications.length - 1].content == item.content;
            else return this.notifications[0].type == item.type && this.notifications[0].title == item.title && this.notifications[0].content == item.content;
        }

        return false
    }

    // Attach all the changes received in the options object
    attachChanges() {
        let keys = Object.keys(this.options);
        keys.forEach(a=>{
            switch (a) {
                case 'lastOnBottom':
                    this.lastOnBottom = this.options.lastOnBottom;
                    break;
                case 'maxStack':
                    this.maxStack = this.options.maxStack;
                    break;
                case 'timeOut':
                    this.timeOut = this.options.timeOut;
                    break;
                case 'clickToClose':
                    this.clickToClose = this.options.clickToClose;
                    break;
                case 'maxLength':
                    this.maxLength = this.options.maxLength;
                    break;
                case 'showProgressBar':
                    this.showProgressBar = this.options.showProgressBar;
                    break;
                case 'pauseOnHover':
                    this.pauseOnHover = this.options.pauseOnHover;
                    break;
                case 'preventDuplicates':
                    this.preventDuplicates = this.options.preventDuplicates;
                    break;
                case 'preventLastDuplicates':
                    this.preventLastDuplicates = this.options.preventLastDuplicates;
                    break;
                case 'theClass':
                    this.theClass = this.options.theClass;
                    break;
            }
        })
    }

    buildEmit(notification: Notification, to: boolean) {
        let toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            id: notification.id
        };

        if(notification.html) toEmit.html = notification.html;

        else {
            toEmit.title = notification.title;
            toEmit.content = notification.content;
        }

        if(!to) toEmit.destroyedOn = new Date();

        return toEmit;
    }

    ngOnDestroy() { this.listener.unsubscribe() }
}