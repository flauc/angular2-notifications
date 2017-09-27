import {ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Notification} from '../interfaces/notification.type';
import {NotificationsService} from '../services/notifications.service';

@Component({
    selector: 'simple-notification',
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('enterLeave', [

            // Enter from right
            state('fromRight', style({opacity: 1, transform: 'translateX(0)'})),
            transition('* => fromRight', [
                style({opacity: 0, transform: 'translateX(5%)'}),
                animate('400ms ease-in-out')
            ]),
            state('fromRightOut', style({opacity: 0, transform: 'translateX(-5%)'})),
            transition('fromRight => fromRightOut', [
                style({opacity: 1, transform: 'translateX(0)'}),
                animate('300ms ease-in-out')
            ]),

            // Enter from left
            state('fromLeft', style({opacity: 1, transform: 'translateX(0)'})),
            transition('* => fromLeft', [
                style({opacity: 0, transform: 'translateX(-5%)'}),
                animate('400ms ease-in-out')
            ]),
            state('fromLeftOut', style({opacity: 0, transform: 'translateX(5%)'})),
            transition('fromLeft => fromLeftOut', [
                style({opacity: 1, transform: 'translateX(0)'}),
                animate('300ms ease-in-out')
            ]),

            // Rotate
            state('scale', style({opacity: 1, transform: 'scale(1)'})),
            transition('* => scale', [
                style({opacity: 0, transform: 'scale(0)'}),
                animate('400ms ease-in-out')
            ]),
            state('scaleOut', style({opacity: 0, transform: 'scale(0)'})),
            transition('scale => scaleOut', [
                style({opacity: 1, transform: 'scale(1)'}),
                animate('400ms ease-in-out')
            ]),

            // Scale
            state('rotate', style({opacity: 1, transform: 'rotate(0deg)'})),
            transition('* => rotate', [
                style({opacity: 0, transform: 'rotate(5deg)'}),
                animate('400ms ease-in-out')
            ]),
            state('rotateOut', style({opacity: 0, transform: 'rotate(-5deg)'})),
            transition('rotate => rotateOut', [
                style({opacity: 1, transform: 'rotate(0deg)'}),
                animate('400ms ease-in-out')
            ])
        ])
    ],
    template: `
        <div class="simple-notification"
            [@enterLeave]="item.state"
            (click)="onClick($event)"
            [class]="theClass"

            [ngClass]="{
                'alert': item.type === 'alert',
                'error': item.type === 'error',
                'warn': item.type === 'warn',
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

                <div class="icon" *ngIf="item.icon !== 'bare'" [innerHTML]="safeSvg"></div>
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
            padding: 0 50px 0 0;
            line-height: 30px;
            font-size: 20px;
        }

        .simple-notification .sn-content {
            margin: 0;
            font-size: 16px;
            padding: 0 50px 0 0;
            line-height: 20px;
        }

        .simple-notification .icon {
            position: absolute;
            box-sizing: border-box;
            top: 0;
            right: 0;
            width: 70px;
            height: 70px;
            padding: 10px;
        }

        .simple-notification .icon svg {
            fill: #fff;
            width: 100%;
            height: 100%;
        }

        .simple-notification .icon svg g {
            fill: #fff;
        }

        .simple-notification.rtl-mode {
            direction: rtl;
        }

        .simple-notification.rtl-mode .sn-content {
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
        .simple-notification.warn { background: #ffdb5b; }

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
        .simple-notification.warn .sn-progress-loader span { background: #edc242; }
        .simple-notification.bare .sn-progress-loader span { background: #ccc; }

        .simple-notification.warn div .sn-title { color: #444; }
        .simple-notification.warn div .sn-content { color: #444; }
    `]
})

export class NotificationComponent implements OnInit, OnDestroy {

    @Input() public timeOut: number;
    @Input() public showProgressBar: boolean;
    @Input() public pauseOnHover: boolean;
    @Input() public clickToClose: boolean;
    @Input() public maxLength: number;
    @Input() public theClass: string;
    @Input() public rtl: boolean;
    @Input() public animate: string;
    @Input() public position: number;
    @Input() public item: Notification;


    // Progress bar variables
    public progressWidth = 0;
    public safeSvg: SafeHtml;

    private stopTime = false;
    private timer: any;
    private steps: number;
    private speed: number;
    private count = 0;
    private start: any;

    private diff: any;
    private icon: string;

    constructor(
        private notificationService: NotificationsService,
        private domSanitizer: DomSanitizer,
        private changeRef: ChangeDetectorRef,
        private zone: NgZone
    ) {}

    ngOnInit(): void {
        if (this.item.override) {
            this.attachOverrides();
        }
        if (this.animate) {
            this.item.state = this.animate;
        }
        if (this.timeOut !== 0) {
            this.startTimeOut();
        }

        this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.icon || this.item.icon);
    }

    startTimeOut(): void {
        this.steps = this.timeOut / 10;
        this.speed = this.timeOut / this.steps;
        this.start = new Date().getTime();
        this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.speed));
    }

    onEnter(): void {
        if (this.pauseOnHover) {
            this.stopTime = true;
        }
    }

    onLeave(): void {
        if (this.pauseOnHover) {
            this.stopTime = false;
            this.zone.runOutsideAngular(() => setTimeout(this.instance, (this.speed - this.diff)));
        }
    }

    setPosition(): number {
        return this.position !== 0 ? this.position * 90 : 0;
    }

    onClick($e: MouseEvent): void {
        this.item.click!.emit($e);

        if (this.clickToClose) {
            this.remove();
        }
    }

    // Attach all the overrides
    attachOverrides(): void {
        Object.keys(this.item.override).forEach(a => {
            if (this.hasOwnProperty(a)) {
                (<any>this)[a] = this.item.override[a];
            }
        });
    }

    ngOnDestroy(): void {
        clearTimeout(this.timer);
    }

    private instance = () => {
        this.diff = (new Date().getTime() - this.start) - (this.count * this.speed);

        if (this.count++ === this.steps) this.remove();
        else if (!this.stopTime) {
            if (this.showProgressBar) this.progressWidth += 100 / this.steps;

            this.timer = setTimeout(this.instance, (this.speed - this.diff));
        }
        this.zone.run(() => this.changeRef.detectChanges());
    };

    private remove() {
        if (this.animate) {
            this.item.state = this.animate + 'Out';
            setTimeout(() => {
                this.notificationService.set(this.item, false);
            }, 310);
        } else {
            this.notificationService.set(this.item, false);
        }
    }
}
