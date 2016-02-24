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
        'maxLength',
        'showProgressBar'
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

            <div class="progress" *ngIf="showProgressBar">
                <span [ngStyle]="{'width': progressWidth + '%'}"></span>
            </div>

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

        .progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
        }

        .progress span {
            float: left;
            background: red;
            height: 100%;
        }
    `]
})

export class NotificationComponent {
    constructor(
        private _service: NotificationsService
    ) {}

    ngOnInit() {
        if(this.item.override) {
            this.attachOverrides();
        }
        if(this.timeOut != 0) {

            let tickTime = this.timeOut/1000;
            let interval = setInterval(()=> {
                this.progressWidth += 0.1;
            }, tickTime);

            setTimeout(()=> {
                this._service.set(this.item, false);
                clearInterval(interval);
            }, this.timeOut);
        }
    }

    public item: Notification;
    public overrides: any;

    private timeOut: number;
    private position: number;
    private clickToClose: boolean;

    public maxLength: number;
    public showProgressBar: boolean;

    public progressWidth: number = 0;

    setPosition() { return this.position != 0 ? this.position*90 : 0; }


    removeSelf() {
        if(this.clickToClose) this._service.set(this.item, false)
    }


    // Attach all the overrides
    attachOverrides() {
        let keys = Object.keys(this.item.override);
        keys.forEach(a=>{
            switch (a) {
                case 'timeOut':
                    this.timeOut = this.item.override.timeOut;
                    break;
                case 'clickToClose':
                    this.clickToClose = this.item.override.clickToClose;
                    break;
                case 'maxLength':
                    this.maxLength = this.item.override.maxLength;
                    break;
                case 'showProgressBar':
                    this.showProgressBar = this.item.override.showProgressBar;
                    break;
                default:
                    console.error(`no option with the key ${a} exists`);
                    break;
            }
        })
    }
}