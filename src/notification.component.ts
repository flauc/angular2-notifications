import {Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, trigger, state, style, transition, animate} from "@angular/core"
import {DomSanitizationService, SafeHtml} from '@angular/platform-browser';
import {Notification} from "./notification"
import {NotificationsService} from "./notifications.service"
import {MaxPipe} from "./max.pipe"
import {Icons} from "./icons"

@Component({
    selector: "simple-notification",

    inputs: [
        "item",
        "timeOut",
        "position",
        "clickToClose",
        "maxLength",
        "showProgressBar",
        "pauseOnHover",
        "theClass",
        "rtl",
        "animate",
        "icons"
    ],
    pipes: [MaxPipe],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger("enterLeave", [

            // Enter from right
            state("fromRight", style({opacity: 1, transform: "translateX(0)"})),
            transition("* => fromRight", [
                style({opacity: 0, transform: "translateX(5%)"}),
                animate("400ms ease-in-out")
            ]),
            state("fromRightOut", style({opacity: 0, transform: "translateX(-5%)"})),
            transition("fromRight => fromRightOut", [
                style({opacity: 1, transform: "translateX(0)"}),
                animate("300ms ease-in-out")
            ]),

            // Enter from left
            state("fromLeft", style({opacity: 1, transform: "translateX(0)"})),
            transition("* => fromLeft", [
                style({opacity: 0, transform: "translateX(-5%)"}),
                animate("400ms ease-in-out")
            ]),
            state("fromLeftOut", style({opacity: 0, transform: "translateX(5%)"})),
            transition("fromLeft => fromLeftOut", [
                style({opacity: 1, transform: "translateX(0)"}),
                animate("300ms ease-in-out")
            ]),

            // Rotate
            state("scale", style({opacity: 1, transform: "scale(1)"})),
            transition("* => scale", [
                style({opacity: 0, transform: "scale(0)"}),
                animate("400ms ease-in-out")
            ]),
            state("scaleOut", style({opacity: 0, transform: "scale(0)"})),
            transition("scale => scaleOut", [
                style({opacity: 1, transform: "scale(1)"}),
                animate("400ms ease-in-out")
            ]),

            // Scale
            state("rotate", style({opacity: 1, transform: "rotate(0deg)"})),
            transition("* => rotate", [
                style({opacity: 0, transform: "rotate(5deg)"}),
                animate("400ms ease-in-out")
            ]),
            state("rotateOut", style({opacity: 0, transform: "rotate(-5deg)"})),
            transition("rotate => rotateOut", [
                style({opacity: 1, transform: "rotate(0deg)"}),
                animate("400ms ease-in-out")
            ])
        ])
    ],
    template: `
        <div class="simple-notification"
            @enterLeave="item.state"
            (click)="removeOnClick()"
            [class]="theClass"

            [ngClass]="{
                'alert': item.type === 'alert',
                'error': item.type === 'error',
                'success': item.type === 'success',
                'info': item.type === 'info',
                'bare': item.type === 'bare',
                'rtl-mode': rtl
            }"

            (mouseenter)="onEnter()"
            (mouseleave)="onLeave()">

            <div *ngIf="!item.html">
                <div class="sn-title">{{item.title}}</div>
                <div class="sn-content">{{item.content | max:maxLength}}</div>

                <div *ngIf="item.type !== 'bare'" [innerHTML]="safeSvg"></div>
            </div>
            <div *ngIf="item.html" [innerHTML]="item.html"></div>

            <div class="sn-progress-loader" *ngIf="showProgressBar">
                <span [ngStyle]="{'width': progressWidth + '%'}"></span>
            </div>

        </div>
    `,
    styles: [`
        .simple-notification {
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

        .simple-notification .sn-title {
            margin: 0;
            padding: 0;
            line-height: 30px;
            font-size: 20px;
        }

        .simple-notification .sn-content {
            margin: 0;
            font-size: 16px;
            padding: 0 50px 0 0;
            line-height: 20px;
        }

        .simple-notification svg {
            position: absolute;
            box-sizing: border-box;
            top: 0;
            right: 0;
            width: auto;
            height: 70px;
            padding: 10px;
            fill: #fff;
        }

        .simple-notification.rtl-mode {
            direction: rtl;
        }

        .simple-notification.rtl-mode .content {
            padding: 0 0 0 50px;
        }

        .simple-notification.rtl-mode svg {
            left: 0;
            right: auto;
        }

        .simple-notification.error { background: #F44336; }
        .simple-notification.success { background: #8BC34A; }
        .simple-notification.alert { background: #ffdb5b; }
        .simple-notification.info { background: #03A9F4; }

        .simple-notification .sn-progress-loader {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
        }

        .simple-notification .sn-progress-loader span {
            float: left;
            height: 100%;
        }

        .simple-notification.success .sn-progress-loader span { background: #689F38; }
        .simple-notification.error .sn-progress-loader span { background: #D32F2F; }
        .simple-notification.alert .sn-progress-loader span { background: #edc242; }
        .simple-notification.info .sn-progress-loader span { background: #0288D1; }
        .simple-notification.bare .sn-progress-loader span { background: #ccc; }
    `]
})

export class NotificationComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private _service: NotificationsService,
        private _sanitizer: DomSanitizationService
    ) {}

    public icons: Icons;

    ////// Inputs
    public safeSvg: SafeHtml;
    public item: Notification;
    public maxLength: number;
    public showProgressBar: boolean;
    public theClass: string;
    public rtl: boolean;
    public animate: string;

    public overrides: any;

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

    private timeOut: number;
    private position: number;
    private clickToClose: boolean;
    private pauseOnHover: boolean;

    ngOnInit(): void {
        console.log(this.animate);
        if (this.animate) this.item["state"] = this.animate;
        if (this.item.override) this.attachOverrides();
        if (this.timeOut !== 0) this.startTimeOut();
        this.safeSvg = this._sanitizer.bypassSecurityTrustHtml(this.icons[this.item.type]);
    }

    startTimeOut(): void {
        this.steps = this.timeOut / 10;
        this.speed = this.timeOut / this.steps;
        this.start = new Date().getTime();
        this.timer = setTimeout(this.instance, this.speed);
    }

    onEnter(): void {
        if (this.pauseOnHover) this.stopTime = true
    }

    onLeave(): void {
        if (this.pauseOnHover) {
            this.stopTime = false;
            setTimeout(this.instance, (this.speed - this.diff));
        }
    }

    setPosition(): number {
        return this.position !== 0 ? this.position * 90 : 0;
    }

    removeOnClick(): void {
        if (this.clickToClose) this._remove()
    }

    // Attach all the overrides
    attachOverrides(): void {
        Object.keys(this.item.override).forEach(a => this[a] = this.item.override[a])
    }

    ngOnDestroy(): void { clearTimeout(this.timer) }

    private instance = () => {
        this.diff = (new Date().getTime() - this.start) - (this.count * this.speed);
        if (this.count++ === this.steps) this._remove();
        else if (!this.stopTime) {
            if (this.showProgressBar) this.progressWidth += 100 / this.steps;
            this.timer = setTimeout(this.instance, (this.speed - this.diff));
        }
    };

    private _remove() {
        if (this.animate) {
            this.item["state"] = this.animate + "Out";
            setTimeout(() => this._service.set(this.item, false), 310)
        }

        else this._service.set(this.item, false)
    }
}
