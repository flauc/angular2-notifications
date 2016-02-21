import {Component, OnInit} from "angular2/core";
import {Notification} from "./notification";
import {NotificationsService} from "./notifications.service";
import {NotificationType} from "./notificationType";
import {AlertIcon} from "./icons/alert.icon";
import {ErrorIcon} from "./icons/error.icon";
import {SuccessIcon} from "./icons/success.icon";
import {MaxPipe} from "./max.pipe";

@Component({
    selector: 'simple-notification',
    inputs: [
        'item',
        'timeOut',
        'position',
        'clickToClose',
        'maxLength'
    ],
    directives: [AlertIcon, ErrorIcon, SuccessIcon],
    pipes: [MaxPipe],
    template: `
        <div class="notification"
            (click)="removeSelf()"
            [ngClass]="{alert: item.type == 'alert', error: item.type == 'error', success: item.type == 'success'}">

            <h3>{{item.title}}</h3>
            <p>{{item.content | max:maxLength}}</p>

            <alertIcon *ngIf="item.type == 'alert'"></alertIcon>
            <errorIcon *ngIf="item.type == 'error'"></errorIcon>
            <successIcon *ngIf="item.type == 'success'"></successIcon>

        </div>
    `,
    styles: [`
        .notification {
            width: 100%;
            padding: 10px 20px;
            box-sizing: border-box;
            position: relative;
            float: left;
            margin-bottom: 10px;
            color: #fff;
            cursor: pointer;
            transition: all 0.5s;
        }

        h3 {
            margin: 0;
            padding: 0;
            line-height: 30px;
        }

        p {
            margin: 0;
            padding: 0 50px 0 0;
            line-height: 20px;
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

    public maxLength: number;

    setPosition() {
        return this.position != 0 ? this.position*90 : 0;
    }


    removeSelf() { if(this.clickToClose) this._service.set(this.item, false) }
}