import {Component, OnInit} from "angular2/core";
import {Notification} from "./notification";
import {NotificationsService} from "./notifications.service";
import {NotificationType} from "./notificationType";
import {AlertIcon} from "./icons/alert.icon";
import {ErrorIcon} from "./icons/error.icon";
import {SuccessIcon} from "./icons/success.icon";

@Component({
    selector: 'simple-notification',
    inputs: [
        'item',
        'timeOut',
        'position',
        'clickToClose'
    ],
    directives: [AlertIcon, ErrorIcon, SuccessIcon],
    template: `
        <div class="notification"
            (click)="removeSelf()"
            [ngClass]="{alert: item.type == 'alert', error: item.type == 'error', success: item.type == 'success'}"
            [style.bottom]="setPosition()">

            <h3>{{item.title}}</h3>
            <p>{{item.content}}</p>

            <alertIcon *ngIf="item.type == 'alert'"></alertIcon>
            <errorIcon *ngIf="item.type == 'error'"></errorIcon>
            <successIcon *ngIf="item.type == 'success'"></successIcon>

        </div>
    `,
    styles: [`
        .notification {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            bottom: 0;
            right: 0;
            position: absolute;
            color: #fff;
            cursor: pointer;
            transition: all 0.5s;
        }
        .error {
            background: #ff6b6b;
        }
        .success {
            background: #97fc8f;
        }
        .alert {
            background: #ffdb5b;
        }
    `]
})

export class NotificationComponent {
    constructor(
        private _service: NotificationsService
    ) {}

    ngOnInit() {
        console.log(this.item);
        console.log(' timeOut: ' + this.timeOut, ' position: ' + this.position, ' clickToClose: ' + this.clickToClose);
        if(this.timeOut != 0) {
            setTimeout(()=> {
                this.removeSelf();
            }, this.timeOut)
        }
    }

    public item: Notification;

    private timeOut: number;
    private position: number;
    private clickToClose: boolean;

    setPosition() {
        return this.position != 0 ? this.position*90 : 0;
    }


    removeSelf() { if(this.clickToClose) this._service.set(this.item, false) }
}