import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/notifications.service";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
export class NotificationComponent {
    notificationService;
    domSanitizer;
    cd;
    zone;
    timeOut;
    showProgressBar;
    pauseOnHover;
    clickToClose;
    clickIconToClose;
    maxLength;
    theClass;
    rtl;
    animate;
    position;
    item;
    // Progress bar variables
    title;
    content;
    titleIsTemplate = false;
    contentIsTemplate = false;
    htmlIsTemplate = false;
    progressWidth = 0;
    safeSvg;
    safeInputHtml;
    stopTime = false;
    timer;
    framesPerSecond = 40;
    sleepTime;
    startTime;
    endTime;
    pauseStart;
    icon;
    constructor(notificationService, domSanitizer, cd, zone) {
        this.notificationService = notificationService;
        this.domSanitizer = domSanitizer;
        this.cd = cd;
        this.zone = zone;
    }
    ngOnInit() {
        if (this.item.override) {
            this.attachOverrides();
        }
        if (this.animate) {
            this.item.state = this.animate;
        }
        if (this.timeOut !== 0) {
            this.startTimeOut();
        }
        this.contentType(this.item.title, 'title');
        this.contentType(this.item.content, 'content');
        this.contentType(this.item.html, 'html');
        this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.icon || this.item.icon);
        this.safeInputHtml = this.domSanitizer.bypassSecurityTrustHtml(this.item.html);
    }
    ngOnDestroy() {
        clearTimeout(this.timer);
        this.cd.detach();
    }
    startTimeOut() {
        this.sleepTime = 1000 / this.framesPerSecond /* ms */;
        this.startTime = new Date().getTime();
        this.endTime = this.startTime + this.timeOut;
        this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.sleepTime));
    }
    onEnter() {
        if (this.pauseOnHover) {
            this.stopTime = true;
            this.pauseStart = new Date().getTime();
        }
    }
    onLeave() {
        if (this.pauseOnHover) {
            this.stopTime = false;
            this.startTime += (new Date().getTime() - this.pauseStart);
            this.endTime += (new Date().getTime() - this.pauseStart);
            this.zone.runOutsideAngular(() => setTimeout(this.instance, this.sleepTime));
        }
    }
    onClick(event) {
        this.item.click.emit(event);
        if (this.clickToClose) {
            this.remove();
        }
    }
    onClickIcon(event) {
        this.item.clickIcon.emit(event);
        if (this.clickIconToClose) {
            this.remove();
        }
    }
    // Attach all the overrides
    attachOverrides() {
        Object.keys(this.item.override).forEach(a => {
            if (this.hasOwnProperty(a)) {
                this[a] = this.item.override[a];
            }
        });
    }
    instance = () => {
        const now = new Date().getTime();
        if (this.endTime < now) {
            this.remove();
            this.item.timeoutEnd.emit();
        }
        else if (!this.stopTime) {
            if (this.showProgressBar) {
                // We add this.sleepTime just to have 100% before close
                this.progressWidth = Math.min((now - this.startTime + this.sleepTime) * 100 / this.timeOut, 100);
            }
            this.timer = setTimeout(this.instance, this.sleepTime);
        }
        this.zone.run(() => {
            if (!this.cd.destroyed) {
                this.cd.detectChanges();
            }
        });
    };
    remove() {
        if (this.animate) {
            this.item.state = this.animate + 'Out';
            setTimeout(() => {
                this.notificationService.set(this.item, false);
            }, 310);
        }
        else {
            this.notificationService.set(this.item, false);
        }
    }
    contentType(item, key) {
        if (item instanceof TemplateRef) {
            this[key] = item;
        }
        else {
            this[key] = this.domSanitizer.bypassSecurityTrustHtml(item);
        }
        this[key + 'IsTemplate'] = item instanceof TemplateRef;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NotificationComponent, deps: [{ token: i1.NotificationsService }, { token: i2.DomSanitizer }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: NotificationComponent, selector: "simple-notification", inputs: { timeOut: "timeOut", showProgressBar: "showProgressBar", pauseOnHover: "pauseOnHover", clickToClose: "clickToClose", clickIconToClose: "clickIconToClose", maxLength: "maxLength", theClass: "theClass", rtl: "rtl", animate: "animate", position: "position", item: "item" }, ngImport: i0, template: "<div class=\"simple-notification\"\r\n     [@enterLeave]=\"item.state\"\r\n     (click)=\"onClick($event)\"\r\n     [class]=\"theClass\"\r\n     [ngClass]=\"{\r\n            'alert': item.type === 'alert',\r\n            'error': item.type === 'error',\r\n            'warn': item.type === 'warn',\r\n            'success': item.type === 'success',\r\n            'info': item.type === 'info',\r\n            'bare': item.type === 'bare',\r\n            'rtl-mode': rtl,\r\n            'has-icon': item.icon !== 'bare'\r\n        }\"\r\n     (mouseenter)=\"onEnter()\"\r\n     (mouseleave)=\"onLeave()\">\r\n\r\n    <div *ngIf=\"!item.html\">\r\n\r\n        <div class=\"sn-title\" *ngIf=\"titleIsTemplate; else regularTitle\">\r\n            <ng-container *ngTemplateOutlet=\"title; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularTitle>\r\n            <div class=\"sn-title\" [innerHTML]=\"title\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"sn-content\" *ngIf=\"contentIsTemplate else regularContent\">\r\n            <ng-container *ngTemplateOutlet=\"content; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularContent>\r\n            <div class=\"sn-content\" [innerHTML]=\"content\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"icon\" *ngIf=\"item.icon !== 'bare'\" [innerHTML]=\"safeSvg\"></div>\r\n    </div>\r\n    <div *ngIf=\"item.html\">\r\n        <div class=\"sn-html\" *ngIf=\"htmlIsTemplate; else regularHtml\">\r\n            <ng-container *ngTemplateOutlet=\"item.html; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularHtml>\r\n            <div class=\"sn-content\" [innerHTML]=\"safeInputHtml\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"icon\" [class.icon-hover]=\"clickIconToClose\" *ngIf=\"item.icon\" [innerHTML]=\"safeSvg\" (click)=\"onClickIcon($event)\"></div>\r\n    </div>\r\n\r\n    <div class=\"sn-progress-loader\" *ngIf=\"showProgressBar\">\r\n        <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span>\r\n    </div>\r\n\r\n</div>\r\n", styles: [".simple-notification{width:100%;padding:10px 20px;box-sizing:border-box;position:relative;float:left;margin-bottom:10px;color:#fff;cursor:pointer;transition:all .5s;min-height:70px}.simple-notification .sn-title,.simple-notification .sn-content,.simple-notification .sn-html{margin:0}.simple-notification .sn-title{line-height:30px;font-size:20px}.simple-notification .sn-content{font-size:16px;line-height:20px}.simple-notification.has-icon .sn-title,.simple-notification.has-icon .sn-content,.simple-notification.has-icon .sn-html{padding:0 50px 0 0}.simple-notification .icon{position:absolute;box-sizing:border-box;top:0;right:0;width:70px;height:70px;padding:10px}.simple-notification .icon.icon-hover:hover{opacity:.5}.simple-notification .icon svg{fill:#fff;width:100%;height:100%}.simple-notification .icon svg g{fill:#fff}.simple-notification.rtl-mode.has-icon .sn-title,.simple-notification.rtl-mode.has-icon .sn-content,.simple-notification.rtl-mode.has-icon .sn-html{padding:0 0 0 50px}.simple-notification.rtl-mode{direction:rtl}.simple-notification.rtl-mode .sn-content{padding:0 0 0 50px}.simple-notification.rtl-mode svg{left:0;right:auto}.simple-notification.error{background:#F44336}.simple-notification.success{background:#8BC34A}.simple-notification.alert{background:#ffdb5b}.simple-notification.info{background:#03A9F4}.simple-notification.warn{background:#ffdb5b}.simple-notification .sn-progress-loader{position:absolute;top:0;left:0;width:100%;height:5px}.simple-notification .sn-progress-loader span{float:left;height:100%}.simple-notification.success .sn-progress-loader span{background:#689F38}.simple-notification.error .sn-progress-loader span{background:#D32F2F}.simple-notification.alert .sn-progress-loader span{background:#edc242}.simple-notification.info .sn-progress-loader span{background:#0288D1}.simple-notification.warn .sn-progress-loader span{background:#edc242}.simple-notification.bare .sn-progress-loader span{background:#ccc}.simple-notification.warn div .sn-title,.simple-notification.warn div .sn-content,.simple-notification.warn div .sn-html{color:#444}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
            trigger('enterLeave', [
                // Fade
                state('fade', style({ opacity: 1 })),
                transition('* => fade', [
                    style({ opacity: 0 }),
                    animate('400ms ease-in-out')
                ]),
                state('fadeOut', style({ opacity: 0 })),
                transition('fade => fadeOut', [
                    style({ opacity: 1 }),
                    animate('300ms ease-in-out')
                ]),
                // Enter from top
                state('fromTop', style({ opacity: 1, transform: 'translateY(0)' })),
                transition('* => fromTop', [
                    style({ opacity: 0, transform: 'translateY(-5%)' }),
                    animate('400ms ease-in-out')
                ]),
                state('fromTopOut', style({ opacity: 0, transform: 'translateY(5%)' })),
                transition('fromTop => fromTopOut', [
                    style({ opacity: 1, transform: 'translateY(0)' }),
                    animate('300ms ease-in-out')
                ]),
                // Enter from right
                state('fromRight', style({ opacity: 1, transform: 'translateX(0)' })),
                transition('* => fromRight', [
                    style({ opacity: 0, transform: 'translateX(5%)' }),
                    animate('400ms ease-in-out')
                ]),
                state('fromRightOut', style({ opacity: 0, transform: 'translateX(-5%)' })),
                transition('fromRight => fromRightOut', [
                    style({ opacity: 1, transform: 'translateX(0)' }),
                    animate('300ms ease-in-out')
                ]),
                // Enter from bottom
                state('fromBottom', style({ opacity: 1, transform: 'translateY(0)' })),
                transition('* => fromBottom', [
                    style({ opacity: 0, transform: 'translateY(5%)' }),
                    animate('400ms ease-in-out')
                ]),
                state('fromBottomOut', style({ opacity: 0, transform: 'translateY(-5%)' })),
                transition('fromBottom => fromBottomOut', [
                    style({ opacity: 1, transform: 'translateY(0)' }),
                    animate('300ms ease-in-out')
                ]),
                // Enter from left
                state('fromLeft', style({ opacity: 1, transform: 'translateX(0)' })),
                transition('* => fromLeft', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    animate('400ms ease-in-out')
                ]),
                state('fromLeftOut', style({ opacity: 0, transform: 'translateX(5%)' })),
                transition('fromLeft => fromLeftOut', [
                    style({ opacity: 1, transform: 'translateX(0)' }),
                    animate('300ms ease-in-out')
                ]),
                // Rotate
                state('scale', style({ opacity: 1, transform: 'scale(1)' })),
                transition('* => scale', [
                    style({ opacity: 0, transform: 'scale(0)' }),
                    animate('400ms ease-in-out')
                ]),
                state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
                transition('scale => scaleOut', [
                    style({ opacity: 1, transform: 'scale(1)' }),
                    animate('400ms ease-in-out')
                ]),
                // Scale
                state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
                transition('* => rotate', [
                    style({ opacity: 0, transform: 'rotate(5deg)' }),
                    animate('400ms ease-in-out')
                ]),
                state('rotateOut', style({ opacity: 0, transform: 'rotate(-5deg)' })),
                transition('rotate => rotateOut', [
                    style({ opacity: 1, transform: 'rotate(0deg)' }),
                    animate('400ms ease-in-out')
                ])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NotificationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'simple-notification', encapsulation: ViewEncapsulation.None, animations: [
                        trigger('enterLeave', [
                            // Fade
                            state('fade', style({ opacity: 1 })),
                            transition('* => fade', [
                                style({ opacity: 0 }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fadeOut', style({ opacity: 0 })),
                            transition('fade => fadeOut', [
                                style({ opacity: 1 }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from top
                            state('fromTop', style({ opacity: 1, transform: 'translateY(0)' })),
                            transition('* => fromTop', [
                                style({ opacity: 0, transform: 'translateY(-5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromTopOut', style({ opacity: 0, transform: 'translateY(5%)' })),
                            transition('fromTop => fromTopOut', [
                                style({ opacity: 1, transform: 'translateY(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from right
                            state('fromRight', style({ opacity: 1, transform: 'translateX(0)' })),
                            transition('* => fromRight', [
                                style({ opacity: 0, transform: 'translateX(5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromRightOut', style({ opacity: 0, transform: 'translateX(-5%)' })),
                            transition('fromRight => fromRightOut', [
                                style({ opacity: 1, transform: 'translateX(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from bottom
                            state('fromBottom', style({ opacity: 1, transform: 'translateY(0)' })),
                            transition('* => fromBottom', [
                                style({ opacity: 0, transform: 'translateY(5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromBottomOut', style({ opacity: 0, transform: 'translateY(-5%)' })),
                            transition('fromBottom => fromBottomOut', [
                                style({ opacity: 1, transform: 'translateY(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from left
                            state('fromLeft', style({ opacity: 1, transform: 'translateX(0)' })),
                            transition('* => fromLeft', [
                                style({ opacity: 0, transform: 'translateX(-5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromLeftOut', style({ opacity: 0, transform: 'translateX(5%)' })),
                            transition('fromLeft => fromLeftOut', [
                                style({ opacity: 1, transform: 'translateX(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Rotate
                            state('scale', style({ opacity: 1, transform: 'scale(1)' })),
                            transition('* => scale', [
                                style({ opacity: 0, transform: 'scale(0)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
                            transition('scale => scaleOut', [
                                style({ opacity: 1, transform: 'scale(1)' }),
                                animate('400ms ease-in-out')
                            ]),
                            // Scale
                            state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
                            transition('* => rotate', [
                                style({ opacity: 0, transform: 'rotate(5deg)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('rotateOut', style({ opacity: 0, transform: 'rotate(-5deg)' })),
                            transition('rotate => rotateOut', [
                                style({ opacity: 1, transform: 'rotate(0deg)' }),
                                animate('400ms ease-in-out')
                            ])
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"simple-notification\"\r\n     [@enterLeave]=\"item.state\"\r\n     (click)=\"onClick($event)\"\r\n     [class]=\"theClass\"\r\n     [ngClass]=\"{\r\n            'alert': item.type === 'alert',\r\n            'error': item.type === 'error',\r\n            'warn': item.type === 'warn',\r\n            'success': item.type === 'success',\r\n            'info': item.type === 'info',\r\n            'bare': item.type === 'bare',\r\n            'rtl-mode': rtl,\r\n            'has-icon': item.icon !== 'bare'\r\n        }\"\r\n     (mouseenter)=\"onEnter()\"\r\n     (mouseleave)=\"onLeave()\">\r\n\r\n    <div *ngIf=\"!item.html\">\r\n\r\n        <div class=\"sn-title\" *ngIf=\"titleIsTemplate; else regularTitle\">\r\n            <ng-container *ngTemplateOutlet=\"title; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularTitle>\r\n            <div class=\"sn-title\" [innerHTML]=\"title\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"sn-content\" *ngIf=\"contentIsTemplate else regularContent\">\r\n            <ng-container *ngTemplateOutlet=\"content; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularContent>\r\n            <div class=\"sn-content\" [innerHTML]=\"content\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"icon\" *ngIf=\"item.icon !== 'bare'\" [innerHTML]=\"safeSvg\"></div>\r\n    </div>\r\n    <div *ngIf=\"item.html\">\r\n        <div class=\"sn-html\" *ngIf=\"htmlIsTemplate; else regularHtml\">\r\n            <ng-container *ngTemplateOutlet=\"item.html; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularHtml>\r\n            <div class=\"sn-content\" [innerHTML]=\"safeInputHtml\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"icon\" [class.icon-hover]=\"clickIconToClose\" *ngIf=\"item.icon\" [innerHTML]=\"safeSvg\" (click)=\"onClickIcon($event)\"></div>\r\n    </div>\r\n\r\n    <div class=\"sn-progress-loader\" *ngIf=\"showProgressBar\">\r\n        <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span>\r\n    </div>\r\n\r\n</div>\r\n", styles: [".simple-notification{width:100%;padding:10px 20px;box-sizing:border-box;position:relative;float:left;margin-bottom:10px;color:#fff;cursor:pointer;transition:all .5s;min-height:70px}.simple-notification .sn-title,.simple-notification .sn-content,.simple-notification .sn-html{margin:0}.simple-notification .sn-title{line-height:30px;font-size:20px}.simple-notification .sn-content{font-size:16px;line-height:20px}.simple-notification.has-icon .sn-title,.simple-notification.has-icon .sn-content,.simple-notification.has-icon .sn-html{padding:0 50px 0 0}.simple-notification .icon{position:absolute;box-sizing:border-box;top:0;right:0;width:70px;height:70px;padding:10px}.simple-notification .icon.icon-hover:hover{opacity:.5}.simple-notification .icon svg{fill:#fff;width:100%;height:100%}.simple-notification .icon svg g{fill:#fff}.simple-notification.rtl-mode.has-icon .sn-title,.simple-notification.rtl-mode.has-icon .sn-content,.simple-notification.rtl-mode.has-icon .sn-html{padding:0 0 0 50px}.simple-notification.rtl-mode{direction:rtl}.simple-notification.rtl-mode .sn-content{padding:0 0 0 50px}.simple-notification.rtl-mode svg{left:0;right:auto}.simple-notification.error{background:#F44336}.simple-notification.success{background:#8BC34A}.simple-notification.alert{background:#ffdb5b}.simple-notification.info{background:#03A9F4}.simple-notification.warn{background:#ffdb5b}.simple-notification .sn-progress-loader{position:absolute;top:0;left:0;width:100%;height:5px}.simple-notification .sn-progress-loader span{float:left;height:100%}.simple-notification.success .sn-progress-loader span{background:#689F38}.simple-notification.error .sn-progress-loader span{background:#D32F2F}.simple-notification.alert .sn-progress-loader span{background:#edc242}.simple-notification.info .sn-progress-loader span{background:#0288D1}.simple-notification.warn .sn-progress-loader span{background:#edc242}.simple-notification.bare .sn-progress-loader span{background:#ccc}.simple-notification.warn div .sn-title,.simple-notification.warn div .sn-content,.simple-notification.warn div .sn-html{color:#444}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NotificationsService }, { type: i2.DomSanitizer }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { timeOut: [{
                type: Input
            }], showProgressBar: [{
                type: Input
            }], pauseOnHover: [{
                type: Input
            }], clickToClose: [{
                type: Input
            }], clickIconToClose: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], theClass: [{
                type: Input
            }], rtl: [{
                type: Input
            }], animate: [{
                type: Input
            }], position: [{
                type: Input
            }], item: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTZCLFdBQVcsRUFBRSxpQkFBaUIsRUFBOEIsTUFBTSxlQUFlLENBQUM7Ozs7O0FBc0dqSyxNQUFNLE9BQU8scUJBQXFCO0lBc0N0QjtJQUNBO0lBQ0E7SUFDQTtJQXZDRCxPQUFPLENBQVM7SUFDaEIsZUFBZSxDQUFVO0lBQ3pCLFlBQVksQ0FBVTtJQUN0QixZQUFZLENBQVU7SUFDdEIsZ0JBQWdCLENBQVU7SUFDMUIsU0FBUyxDQUFTO0lBQ2xCLFFBQVEsQ0FBUztJQUNqQixHQUFHLENBQVU7SUFDYixPQUFPLENBQTRCO0lBQ25DLFFBQVEsQ0FBUztJQUNqQixJQUFJLENBQWU7SUFHNUIseUJBQXlCO0lBQ3pCLEtBQUssQ0FBTTtJQUNYLE9BQU8sQ0FBTTtJQUViLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDeEIsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQzFCLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFFdkIsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQVc7SUFDbEIsYUFBYSxDQUFXO0lBRWhCLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIsS0FBSyxDQUFNO0lBQ1gsZUFBZSxHQUFHLEVBQUUsQ0FB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QVMsRUFBRSxVQUFVLEVBQUMsQ0FBQztnQ0FDMUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDOzZCQUM3QixDQUFDOzRCQUVGLFFBQVE7NEJBQ1IsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDOzRCQUMvRCxVQUFVLENBQUMsYUFBYSxFQUFFO2dDQUN4QixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsQ0FBQztnQ0FDOUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDOzZCQUM3QixDQUFDOzRCQUNGLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFDLENBQUMsQ0FBQzs0QkFDbkUsVUFBVSxDQUFDLHFCQUFxQixFQUFFO2dDQUNoQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsQ0FBQztnQ0FDOUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDOzZCQUM3QixDQUFDO3lCQUNILENBQUM7cUJBQ0gsbUJBR2dCLHVCQUF1QixDQUFDLE1BQU07MkxBS3RDLE9BQU87c0JBQWYsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25BbmltYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vZW51bXMvbm90aWZpY2F0aW9uLWFuaW1hdGlvbi10eXBlLmVudW0nO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL25vdGlmaWNhdGlvbi50eXBlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzaW1wbGUtbm90aWZpY2F0aW9uJyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2VudGVyTGVhdmUnLCBbXHJcblxyXG4gICAgICAvLyBGYWRlXHJcbiAgICAgIHN0YXRlKCdmYWRlJywgc3R5bGUoe29wYWNpdHk6IDF9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gZmFkZScsIFtcclxuICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JylcclxuICAgICAgXSksXHJcbiAgICAgIHN0YXRlKCdmYWRlT3V0Jywgc3R5bGUoe29wYWNpdHk6IDB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2ZhZGUgPT4gZmFkZU91dCcsIFtcclxuICAgICAgICBzdHlsZSh7b3BhY2l0eTogMX0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzMwMG1zIGVhc2UtaW4tb3V0JylcclxuICAgICAgXSksXHJcblxyXG4gICAgICAvLyBFbnRlciBmcm9tIHRvcFxyXG4gICAgICBzdGF0ZSgnZnJvbVRvcCcsIHN0eWxlKHtvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignKiA9PiBmcm9tVG9wJywgW1xyXG4gICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01JSknfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKVxyXG4gICAgICBdKSxcclxuICAgICAgc3RhdGUoJ2Zyb21Ub3BPdXQnLCBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg1JSknfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCdmcm9tVG9wID0+IGZyb21Ub3BPdXQnLCBbXHJcbiAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMzAwbXMgZWFzZS1pbi1vdXQnKVxyXG4gICAgICBdKSxcclxuXHJcbiAgICAgIC8vIEVudGVyIGZyb20gcmlnaHRcclxuICAgICAgc3RhdGUoJ2Zyb21SaWdodCcsIHN0eWxlKHtvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignKiA9PiBmcm9tUmlnaHQnLCBbXHJcbiAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoNSUpJ30pLFxyXG4gICAgICAgIGFuaW1hdGUoJzQwMG1zIGVhc2UtaW4tb3V0JylcclxuICAgICAgXSksXHJcbiAgICAgIHN0YXRlKCdmcm9tUmlnaHRPdXQnLCBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNSUpJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignZnJvbVJpZ2h0ID0+IGZyb21SaWdodE91dCcsIFtcclxuICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSd9KSxcclxuICAgICAgICBhbmltYXRlKCczMDBtcyBlYXNlLWluLW91dCcpXHJcbiAgICAgIF0pLFxyXG5cclxuICAgICAgLy8gRW50ZXIgZnJvbSBib3R0b21cclxuICAgICAgc3RhdGUoJ2Zyb21Cb3R0b20nLCBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSd9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gZnJvbUJvdHRvbScsIFtcclxuICAgICAgICBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg1JSknfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKVxyXG4gICAgICBdKSxcclxuICAgICAgc3RhdGUoJ2Zyb21Cb3R0b21PdXQnLCBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNSUpJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignZnJvbUJvdHRvbSA9PiBmcm9tQm90dG9tT3V0JywgW1xyXG4gICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJ30pLFxyXG4gICAgICAgIGFuaW1hdGUoJzMwMG1zIGVhc2UtaW4tb3V0JylcclxuICAgICAgXSksXHJcblxyXG4gICAgICAvLyBFbnRlciBmcm9tIGxlZnRcclxuICAgICAgc3RhdGUoJ2Zyb21MZWZ0Jywgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IGZyb21MZWZ0JywgW1xyXG4gICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01JSknfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKVxyXG4gICAgICBdKSxcclxuICAgICAgc3RhdGUoJ2Zyb21MZWZ0T3V0Jywgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoNSUpJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignZnJvbUxlZnQgPT4gZnJvbUxlZnRPdXQnLCBbXHJcbiAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMzAwbXMgZWFzZS1pbi1vdXQnKVxyXG4gICAgICBdKSxcclxuXHJcbiAgICAgIC8vIFJvdGF0ZVxyXG4gICAgICBzdGF0ZSgnc2NhbGUnLCBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSknfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHNjYWxlJywgW1xyXG4gICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZSgwKSd9KSxcclxuICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLWluLW91dCcpXHJcbiAgICAgIF0pLFxyXG4gICAgICBzdGF0ZSgnc2NhbGVPdXQnLCBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMCknfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCdzY2FsZSA9PiBzY2FsZU91dCcsIFtcclxuICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSknfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKVxyXG4gICAgICBdKSxcclxuXHJcbiAgICAgIC8vIFNjYWxlXHJcbiAgICAgIHN0YXRlKCdyb3RhdGUnLCBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJ30pKSxcclxuICAgICAgdHJhbnNpdGlvbignKiA9PiByb3RhdGUnLCBbXHJcbiAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3JvdGF0ZSg1ZGVnKSd9KSxcclxuICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLWluLW91dCcpXHJcbiAgICAgIF0pLFxyXG4gICAgICBzdGF0ZSgncm90YXRlT3V0Jywgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3JvdGF0ZSgtNWRlZyknfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCdyb3RhdGUgPT4gcm90YXRlT3V0JywgW1xyXG4gICAgICAgIHN0eWxlKHtvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZS1pbi1vdXQnKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3RpZmljYXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25vdGlmaWNhdGlvbi5jb21wb25lbnQuY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpIHRpbWVPdXQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBzaG93UHJvZ3Jlc3NCYXI6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcGF1c2VPbkhvdmVyOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGNsaWNrVG9DbG9zZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBjbGlja0ljb25Ub0Nsb3NlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1heExlbmd0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHRoZUNsYXNzOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcnRsOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGFuaW1hdGU6IE5vdGlmaWNhdGlvbkFuaW1hdGlvblR5cGU7XHJcbiAgQElucHV0KCkgcG9zaXRpb246IG51bWJlcjtcclxuICBASW5wdXQoKSBpdGVtOiBOb3RpZmljYXRpb247XHJcblxyXG5cclxuICAvLyBQcm9ncmVzcyBiYXIgdmFyaWFibGVzXHJcbiAgdGl0bGU6IGFueTtcclxuICBjb250ZW50OiBhbnk7XHJcblxyXG4gIHRpdGxlSXNUZW1wbGF0ZSA9IGZhbHNlO1xyXG4gIGNvbnRlbnRJc1RlbXBsYXRlID0gZmFsc2U7XHJcbiAgaHRtbElzVGVtcGxhdGUgPSBmYWxzZTtcclxuXHJcbiAgcHJvZ3Jlc3NXaWR0aCA9IDA7XHJcbiAgc2FmZVN2ZzogU2FmZUh0bWw7XHJcbiAgc2FmZUlucHV0SHRtbDogU2FmZUh0bWw7XHJcblxyXG4gIHByaXZhdGUgc3RvcFRpbWUgPSBmYWxzZTtcclxuICBwcml2YXRlIHRpbWVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBmcmFtZXNQZXJTZWNvbmQgPSA0MDtcclxuICBwcml2YXRlIHNsZWVwVGltZTogbnVtYmVyO1xyXG4gIHByaXZhdGUgc3RhcnRUaW1lOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBlbmRUaW1lOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBwYXVzZVN0YXJ0OiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgaWNvbjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxyXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5pdGVtLm92ZXJyaWRlKSB7XHJcbiAgICAgIHRoaXMuYXR0YWNoT3ZlcnJpZGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xyXG4gICAgICB0aGlzLml0ZW0uc3RhdGUgPSB0aGlzLmFuaW1hdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudGltZU91dCAhPT0gMCkge1xyXG4gICAgICB0aGlzLnN0YXJ0VGltZU91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29udGVudFR5cGUodGhpcy5pdGVtLnRpdGxlLCAndGl0bGUnKTtcclxuICAgIHRoaXMuY29udGVudFR5cGUodGhpcy5pdGVtLmNvbnRlbnQsICdjb250ZW50Jyk7XHJcbiAgICB0aGlzLmNvbnRlbnRUeXBlKHRoaXMuaXRlbS5odG1sLCAnaHRtbCcpO1xyXG5cclxuICAgIHRoaXMuc2FmZVN2ZyA9IHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRoaXMuaWNvbiB8fCB0aGlzLml0ZW0uaWNvbik7XHJcbiAgICB0aGlzLnNhZmVJbnB1dEh0bWwgPSB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLml0ZW0uaHRtbCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgIHRoaXMuY2QuZGV0YWNoKCk7XHJcbiAgfVxyXG5cclxuICBzdGFydFRpbWVPdXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNsZWVwVGltZSA9IDEwMDAgLyB0aGlzLmZyYW1lc1BlclNlY29uZCAvKiBtcyAqLztcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLnN0YXJ0VGltZSArIHRoaXMudGltZU91dDtcclxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLmluc3RhbmNlLCB0aGlzLnNsZWVwVGltZSkpO1xyXG4gIH1cclxuXHJcbiAgb25FbnRlcigpIHtcclxuICAgIGlmICh0aGlzLnBhdXNlT25Ib3Zlcikge1xyXG4gICAgICB0aGlzLnN0b3BUaW1lID0gdHJ1ZTtcclxuICAgICAgdGhpcy5wYXVzZVN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkxlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMucGF1c2VPbkhvdmVyKSB7XHJcbiAgICAgIHRoaXMuc3RvcFRpbWUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdGFydFRpbWUgKz0gKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5wYXVzZVN0YXJ0KTtcclxuICAgICAgdGhpcy5lbmRUaW1lICs9IChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMucGF1c2VTdGFydCk7XHJcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBzZXRUaW1lb3V0KHRoaXMuaW5zdGFuY2UsIHRoaXMuc2xlZXBUaW1lKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICB0aGlzLml0ZW0uY2xpY2shLmVtaXQoZXZlbnQpO1xyXG5cclxuICAgIGlmICh0aGlzLmNsaWNrVG9DbG9zZSkge1xyXG4gICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbGlja0ljb24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIHRoaXMuaXRlbS5jbGlja0ljb24hLmVtaXQoZXZlbnQpO1xyXG5cclxuICAgIGlmICh0aGlzLmNsaWNrSWNvblRvQ2xvc2UpIHtcclxuICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEF0dGFjaCBhbGwgdGhlIG92ZXJyaWRlc1xyXG4gIGF0dGFjaE92ZXJyaWRlcygpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuaXRlbS5vdmVycmlkZSkuZm9yRWFjaChhID0+IHtcclxuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoYSkpIHtcclxuICAgICAgICAodGhpcyBhcyBhbnkpW2FdID0gdGhpcy5pdGVtLm92ZXJyaWRlW2FdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zdGFuY2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5lbmRUaW1lIDwgbm93KSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgIHRoaXMuaXRlbS50aW1lb3V0RW5kIS5lbWl0KCk7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnN0b3BUaW1lKSB7XHJcbiAgICAgIGlmICh0aGlzLnNob3dQcm9ncmVzc0Jhcikge1xyXG4gICAgICAgIC8vIFdlIGFkZCB0aGlzLnNsZWVwVGltZSBqdXN0IHRvIGhhdmUgMTAwJSBiZWZvcmUgY2xvc2VcclxuICAgICAgICB0aGlzLnByb2dyZXNzV2lkdGggPSBNYXRoLm1pbigobm93IC0gdGhpcy5zdGFydFRpbWUgKyB0aGlzLnNsZWVwVGltZSkgKiAxMDAgLyB0aGlzLnRpbWVPdXQsIDEwMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuaW5zdGFuY2UsIHRoaXMuc2xlZXBUaW1lKTtcclxuICAgIH1cclxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAoISh0aGlzLmNkIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xyXG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlKCkge1xyXG4gICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xyXG4gICAgICB0aGlzLml0ZW0uc3RhdGUgPSB0aGlzLmFuaW1hdGUgKyAnT3V0JztcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNldCh0aGlzLml0ZW0sIGZhbHNlKTtcclxuICAgICAgfSwgMzEwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zZXQodGhpcy5pdGVtLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbnRlbnRUeXBlKGl0ZW06IGFueSwga2V5OiBzdHJpbmcpIHtcclxuICAgIGlmIChpdGVtIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcclxuICAgICAgdGhpc1trZXldID0gaXRlbTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXNba2V5XSA9IHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXNba2V5ICsgJ0lzVGVtcGxhdGUnXSA9IGl0ZW0gaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cInNpbXBsZS1ub3RpZmljYXRpb25cIlxyXG4gICAgIFtAZW50ZXJMZWF2ZV09XCJpdGVtLnN0YXRlXCJcclxuICAgICAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICBbY2xhc3NdPVwidGhlQ2xhc3NcIlxyXG4gICAgIFtuZ0NsYXNzXT1cIntcclxuICAgICAgICAgICAgJ2FsZXJ0JzogaXRlbS50eXBlID09PSAnYWxlcnQnLFxyXG4gICAgICAgICAgICAnZXJyb3InOiBpdGVtLnR5cGUgPT09ICdlcnJvcicsXHJcbiAgICAgICAgICAgICd3YXJuJzogaXRlbS50eXBlID09PSAnd2FybicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJzogaXRlbS50eXBlID09PSAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICdpbmZvJzogaXRlbS50eXBlID09PSAnaW5mbycsXHJcbiAgICAgICAgICAgICdiYXJlJzogaXRlbS50eXBlID09PSAnYmFyZScsXHJcbiAgICAgICAgICAgICdydGwtbW9kZSc6IHJ0bCxcclxuICAgICAgICAgICAgJ2hhcy1pY29uJzogaXRlbS5pY29uICE9PSAnYmFyZSdcclxuICAgICAgICB9XCJcclxuICAgICAobW91c2VlbnRlcik9XCJvbkVudGVyKClcIlxyXG4gICAgIChtb3VzZWxlYXZlKT1cIm9uTGVhdmUoKVwiPlxyXG5cclxuICAgIDxkaXYgKm5nSWY9XCIhaXRlbS5odG1sXCI+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzbi10aXRsZVwiICpuZ0lmPVwidGl0bGVJc1RlbXBsYXRlOyBlbHNlIHJlZ3VsYXJUaXRsZVwiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGl0bGU7IGNvbnRleHQ6IGl0ZW0uY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8bmctdGVtcGxhdGUgI3JlZ3VsYXJUaXRsZT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNuLXRpdGxlXCIgW2lubmVySFRNTF09XCJ0aXRsZVwiPjwvZGl2PlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzbi1jb250ZW50XCIgKm5nSWY9XCJjb250ZW50SXNUZW1wbGF0ZSBlbHNlIHJlZ3VsYXJDb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50OyBjb250ZXh0OiBpdGVtLmNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICNyZWd1bGFyQ29udGVudD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNuLWNvbnRlbnRcIiBbaW5uZXJIVE1MXT1cImNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiICpuZ0lmPVwiaXRlbS5pY29uICE9PSAnYmFyZSdcIiBbaW5uZXJIVE1MXT1cInNhZmVTdmdcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiAqbmdJZj1cIml0ZW0uaHRtbFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzbi1odG1sXCIgKm5nSWY9XCJodG1sSXNUZW1wbGF0ZTsgZWxzZSByZWd1bGFySHRtbFwiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbS5odG1sOyBjb250ZXh0OiBpdGVtLmNvbnRleHRcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICNyZWd1bGFySHRtbD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNuLWNvbnRlbnRcIiBbaW5uZXJIVE1MXT1cInNhZmVJbnB1dEh0bWxcIj48L2Rpdj5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiIFtjbGFzcy5pY29uLWhvdmVyXT1cImNsaWNrSWNvblRvQ2xvc2VcIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtpbm5lckhUTUxdPVwic2FmZVN2Z1wiIChjbGljayk9XCJvbkNsaWNrSWNvbigkZXZlbnQpXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwic24tcHJvZ3Jlc3MtbG9hZGVyXCIgKm5nSWY9XCJzaG93UHJvZ3Jlc3NCYXJcIj5cclxuICAgICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7J3dpZHRoJzogcHJvZ3Jlc3NXaWR0aCArICclJ31cIj48L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuXHJcbjwvZGl2PlxyXG4iXX0=