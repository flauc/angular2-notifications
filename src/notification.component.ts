import {Component, OnInit, OnDestroy} from "angular2/core";

import {Notification} from "./notification";
import {NotificationsService} from "./notifications.service";
import {NotificationType} from "./notificationType";
import {AlertIcon} from "./icons/alert.icon";
import {ErrorIcon} from "./icons/error.icon";
import {SuccessIcon} from "./icons/success.icon";
import {MaxPipe} from "./max.pipe";
import {InfoIcon} from "./icons/info.icon";

@Component({
    selector: 'simple-notification',
    inputs: [
        'item',
        'timeOut',
        'position',
        'clickToClose',
        'maxLength',
        'showProgressBar',
        'pauseOnHover',
        'theClass'
    ],
    directives: [AlertIcon, ErrorIcon, SuccessIcon, InfoIcon],
    pipes: [MaxPipe],
    template: `
        <div class="notification"
            (click)="removeSelf()"
            [class]="theClass"
            [ngClass]="{alert: item.type == 'alert', error: item.type == 'error', success: item.type == 'success', info: item.type == 'info'}"
            (mouseenter)="onEnter()"
            (mouseleave)="onLeave()">

            <div *ngIf="!item.html">
                <div class="title">{{item.title}}</div>
                <div class="content">{{item.content | max:maxLength}}</div>

                <alertIcon *ngIf="item.type == 'alert'"></alertIcon>
                <errorIcon *ngIf="item.type == 'error'"></errorIcon>
                <successIcon *ngIf="item.type == 'success'"></successIcon>
                <infoIcon *ngIf="item.type == 'info'"></infoIcon>
            </div>
            <div *ngIf="item.html"[innerHTML]="item.html"></div>

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

        .title {
            margin: 0;
            padding: 0;
            line-height: 30px;
            font-size: 20px;
        }

        .content {
            margin: 0;
            font-size: 16px;
            padding: 0 50px 0 0;
            line-height: 20px;
        }

        .error { background: #F44336; }
        .success { background: #8BC34A; }
        .alert { background: #ffdb5b; }
        .info { background: #03A9F4; }

        .progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
        }

        .progress span {
            float: left;
            height: 100%;
        }

        .success .progress span { background: #689F38; }
        .error .progress span { background: #D32F2F; }
        .alert .progress span { background: #edc242; }
        .info .progress span { background: #0288D1; }
    `]
})

export class NotificationComponent {
    constructor(
        private _service: NotificationsService
    ) {}

    ngOnInit() {
        if(this.item.override) this.attachOverrides();
        if(this.timeOut != 0) this.startTimeOut();
    }


    ////// Inputs
    public item: Notification;
    public maxLength: number;
    public showProgressBar: boolean;
    public theClass: string;
    public theHtml: any;

    public overrides: any;
    private timeOut: number;
    private position: number;
    private clickToClose: boolean;
    private pauseOnHover: boolean;

    ////// Locals

    // Progress bar variables
    public progressWidth: number = 0;
    private stopTime: boolean = false;
    private timer: any;
    private steps: number;
    private speed: number;
    private count: number = 0;
    private start: any;
    private diff: any;

    private instance = ()=> {
        this.diff = (new Date().getTime() - this.start) - (this.count * this.speed);
        if (this.count++ == this.steps) this._service.set(this.item, false);
        else if(!this.stopTime) {
            if(this.showProgressBar) this.progressWidth += 100/this.steps;
            this.timer = setTimeout(this.instance, (this.speed - this.diff));
        }
    };

    startTimeOut() {
        this.steps = this.timeOut/10;
        this.speed = this.timeOut/this.steps;
        this.start = new Date().getTime();
        this.timer = setTimeout(this.instance, this.speed);
    }

    onEnter() {
        if(this.pauseOnHover) this.stopTime = true
    }

    onLeave() {
        if (this.pauseOnHover) {
            this.stopTime = false;
            setTimeout(this.instance, (this.speed - this.diff));
        }
    }

    setPosition() { return this.position != 0 ? this.position*90 : 0; }
    removeSelf() { if(this.clickToClose) this._service.set(this.item, false); }


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
                case 'pauseOnHover':
                    this.pauseOnHover = this.item.override.pauseOnHover;
                    break;
                case 'theClass':
                    this.theClass = this.item.override.theClass;
                    break;
                default:
                    console.error(`no option with the key ${a} exists`);
                    break;
            }
        })
    }

    ngOnDestroy() { clearTimeout(this.timer) }
}